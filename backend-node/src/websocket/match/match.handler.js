import Problem from "../../models/GameplayModels/problem.model.js";
import { JUDGE0_API_URL } from "../../config/env.js";
import {
  getMatch,
  getPlayerState,
  updatePlayerState,
  getOpponentId,
} from "./match.state.js";
import { resolveMatch } from "./match.resolver.js";
import { LANGUAGE_KEY_MAP } from "../../controllers/CompilerControllers/languageKeyMap.js";

// ── executeCode controller ─────────────────────────────────

const getLanguageKey = (id) => LANGUAGE_KEY_MAP[Number(id)] ?? "javascript";
const toBase64 = (s) => Buffer.from(String(s ?? "")).toString("base64");
const fromBase64 = (s) =>
  Buffer.from(String(s ?? ""), "base64").toString("utf-8");

const serializeInput = (input) => {
  if (input === null || input === undefined) return "";
  if (typeof input !== "object") return String(input);
  return Object.values(input)
    .map((v) =>
      Array.isArray(v) || typeof v === "object" ? JSON.stringify(v) : String(v),
    )
    .join("\n");
};

const serializeExpected = (output) => {
  if (output === null || output === undefined) return "";
  if (Array.isArray(output) || typeof output === "object")
    return JSON.stringify(output);
  return String(output);
};

const runOnJudge0 = async (fullCode, languageId, tc, cpuLimit) => {
  const res = await fetch(
    `${JUDGE0_API_URL}/submissions?base64_encoded=true&wait=true`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        language_id: Number(languageId),
        source_code: toBase64(fullCode),
        stdin: toBase64(serializeInput(tc.input)),
        expected_output: toBase64(serializeExpected(tc.output)),
        cpu_time_limit: cpuLimit,
      }),
    },
  );

  if (!res.ok) throw new Error(`Judge0 [${res.status}]: ${await res.text()}`);
  const data = await res.json();

  return {
    testCaseId: tc.testCaseId,
    status: data.status?.description ?? "Unknown",
    statusId: data.status?.id,
    isPassed: data.status?.id === 3,
    stdout: data.stdout ? fromBase64(data.stdout).trim() : null,
    stderr: data.stderr ? fromBase64(data.stderr).trim() : null,
    compile_output: data.compile_output
      ? fromBase64(data.compile_output).trim()
      : null,
    expectedOutput: serializeExpected(tc.output),
    time: data.time,
    memory: data.memory,
    isHidden: tc.isHidden ?? false,
  };
};

// ── Damage formula ────────────────────────────────────────────────────────────
// 10 HP per failed test case
const calcDamage = (failedCount) => failedCount * 10;

function send(ws, payload) {
  if (ws?.readyState === 1) ws.send(JSON.stringify(payload));
}

// ── SUBMIT_CODE ───────────────────────────────────────────────────────────────
export async function handleSubmitCode(ws, data, clients) {
  const { matchId, userId, code, languageId } = data;

  if (!matchId || !userId || !code || !languageId) {
    return send(ws, { type: "ERROR", message: "Invalid SUBMIT_CODE payload." });
  }

  const match = getMatch(matchId);
  if (!match || match.resolved) {
    return send(ws, {
      type: "ERROR",
      message: "Match not found or already resolved.",
    });
  }

  const playerState = getPlayerState(matchId, userId);
  if (!playerState) {
    return send(ws, { type: "ERROR", message: "Player not in this match." });
  }

  const opponentId = getOpponentId(matchId, userId);
  const opponentWs = clients.get(opponentId);

  // ── Run code ────────────────────────────────────────────────────────────────
  let results;
  try {
    // Fetch problem with runner code (server-side only)
    const problem = await Problem.findById(match.problem._id);
    if (!problem)
      return send(ws, { type: "ERROR", message: "Problem not found." });

    const langKey = getLanguageKey(languageId);
    const runnerCode = problem.runnerCode.get(langKey);
    if (!runnerCode)
      return send(ws, { type: "ERROR", message: `No runner for ${langKey}.` });

    const fullCode = `${code}\n${runnerCode}`;
    const cpuLimit = (problem.timeLimitMs / 1000).toFixed(1);

    // Run all test cases in parallel
    results = await Promise.all(
      problem.testCases.map((tc) =>
        runOnJudge0(fullCode, languageId, tc, cpuLimit),
      ),
    );
  } catch (err) {
    console.error("[match.handler] Judge0 error:", err);
    return send(ws, { type: "ERROR", message: "Execution failed." });
  }

  // ── Process results, update state ───────────────────────────────────────────
  playerState.submissions += 1;

  let newCombo = 0;
  let failedCount = 0;
  let passedThisRun = 0;
  let maxComboThisRun = 0;

  for (const result of results) {
    if (result.isPassed) {
      newCombo += 1;
      passedThisRun += 1;
      maxComboThisRun = Math.max(maxComboThisRun, newCombo);
    } else {
      failedCount += 1;
      newCombo = 0; // reset combo on first fail
    }
  }

  const damage = calcDamage(failedCount);
  const newHp = Math.max(0, playerState.hp - damage);
  const isFailedSubmission = failedCount > 0;

  updatePlayerState(matchId, userId, {
    hp: newHp,
    combo: newCombo,
    testsPassed: passedThisRun, // tracks current-run best
    failedSubs: playerState.failedSubs + (isFailedSubmission ? 1 : 0),
    finishedAt:
      passedThisRun === results.length ? Date.now() : playerState.finishedAt,
  });

  // ── Build response for the submitting player ─────────────────────────────────
  const opponentState = getPlayerState(matchId, opponentId);

  const hpUpdate = {
    type: "HP_UPDATE",
    [userId]: { hp: newHp, combo: newCombo },
    [opponentId]: {
      hp: opponentState?.hp ?? 100,
      combo: opponentState?.combo ?? 0,
    },
  };

  // Send results only to the submitting player
  send(ws, {
    type: "SUBMIT_RESULT",
    results,
    combo: newCombo,
    damage,
    hp: newHp,
  });

  // Broadcast HP update to both players
  send(ws, hpUpdate);
  send(opponentWs, hpUpdate);

  console.log(
    `[Match] ${userId} submitted in ${matchId}. ` +
      `Passed: ${passedThisRun}/${results.length}. Damage: ${damage}. HP: ${newHp}. Combo: ${newCombo}`,
  );

  // ── Win/Lose conditions ──────────────────────────────────────────────────────

  // All tests passed → this player wins
  if (passedThisRun === results.length) {
    return resolveMatch(
      matchId,
      userId,
      opponentId,
      "all_tests_passed",
      clients,
    );
  }

  // HP reached 0 → this player loses
  if (newHp <= 0) {
    return resolveMatch(matchId, opponentId, userId, "hp_zero", clients);
  }
}

// ── TIME_EXPIRED ──────────────────────────────────────────────────────────────
export async function handleTimeExpired(data, clients) {
  const { matchId } = data;

  const match = getMatch(matchId);
  if (!match || match.resolved) return; // already handled

  const p1 = match.players[match.player1Id];
  const p2 = match.players[match.player2Id];

  console.log(
    `[Match] Time expired for ${matchId}. ` +
      `P1 tests: ${p1.testsPassed}, P2 tests: ${p2.testsPassed}`,
  );

  if (p1.testsPassed > p2.testsPassed) {
    return resolveMatch(
      matchId,
      match.player1Id,
      match.player2Id,
      "time_expired",
      clients,
    );
  }
  if (p2.testsPassed > p1.testsPassed) {
    return resolveMatch(
      matchId,
      match.player2Id,
      match.player1Id,
      "time_expired",
      clients,
    );
  }

  // Equal → draw (pass null for both)
  return resolveMatch(matchId, null, null, "time_expired", clients);
}
