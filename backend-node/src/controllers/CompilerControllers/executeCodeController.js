import { JUDGE0_API_URL } from "../../config/env.js";
import Problem from "../../models/GameplayModels/problem.model.js";
import Challenge from "../../models/GameplayModels/challenge.model.js";
import UserProgress from "../../models/SystemModels/userProgress.model.js";
import User from "../../models/user.model.js";
import { LANGUAGE_KEY_MAP } from "./languageKeyMap.js";

// ─── Helpers ────────────────────────────────────────────────────────────────
const getLanguageKey = (id) => LANGUAGE_KEY_MAP[Number(id)] ?? "javascript";

// Base64 encoding/decoding for Judge0 API
const toBase64 = (s) => Buffer.from(String(s ?? "")).toString("base64");
const fromBase64 = (s) =>
  Buffer.from(String(s ?? ""), "base64").toString("utf-8");

// Helper to remove ALL whitespaces for a safe, relaxed string comparison
const normalizeString = (str) => String(str ?? "").replace(/\s+/g, "");

// Serialize various input types to a string format suitable for stdin
const serializeInputToStdin = (input) => {
  if (input === null || input === undefined) return "";
  if (typeof input !== "object") return String(input);
  return Object.values(input)
    .map((v) =>
      Array.isArray(v) || (typeof v === "object" && v !== null)
        ? JSON.stringify(v)
        : String(v),
    )
    .join("\n");
};

// Serialize expected output for Judge0 comparison
const serializeExpectedOutput = (output) => {
  if (output === null || output === undefined) return "";
  if (Array.isArray(output) || typeof output === "object")
    return JSON.stringify(output);
  return String(output);
};

// ─── Judge0 API ──────────────────────────────────────────────────────
const judge0Url = `${JUDGE0_API_URL}/submissions?base64_encoded=true&wait=true`;

const runOnJudge0 = async (fullCode, languageId, tc, cpuLimit) => {
  const stdin = serializeInputToStdin(tc.input);
  const expectedOutput = serializeExpectedOutput(tc.output);

  const response = await fetch(judge0Url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      language_id: Number(languageId),
      source_code: toBase64(fullCode),
      stdin: toBase64(stdin),
      expected_output: toBase64(expectedOutput),
      cpu_time_limit: cpuLimit,
    }),
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Judge0 [${response.status}]: ${text}`);
  }

  const result = await response.json();

  const stdoutStr = result.stdout ? fromBase64(result.stdout).trim() : null;
  const stderrStr = result.stderr ? fromBase64(result.stderr).trim() : null;

  // Normalize both outputs by stripping spaces before verifying status
  const normalizedStdout = normalizeString(stdoutStr);
  const normalizedExpected = normalizeString(expectedOutput);

  let isPassed = result.status?.id === 3;
  let customStatusDescription = result.status?.description ?? "Unknown Error";

  // If Judge0 claims it's a Wrong Answer (id: 4) but normalizations match, override to Success!
  if (
    result.status?.id === 4 &&
    normalizedStdout === normalizedExpected &&
    normalizedStdout !== ""
  ) {
    isPassed = true;
    customStatusDescription = "Accepted";
  }

  return {
    testCaseId: tc.testCaseId,
    status: customStatusDescription,
    statusId: isPassed ? 3 : result.status?.id,
    stdout: stdoutStr,
    stderr: stderrStr,
    compile_output: result.compile_output
      ? fromBase64(result.compile_output).trim()
      : null,
    expectedOutput,
    time: result.time,
    memory: result.memory,
    isHidden: tc.isHidden ?? false,
    isCustom: tc.isCustom ?? false,
    isPassed: isPassed,
  };
};

// ─── acceptanceRate ────────────────────────────────────────────────────
const updateAcceptanceRate = (challenge) => {
  if (!challenge.totalSubmissions || challenge.totalSubmissions === 0) {
    challenge.acceptanceRate = 0;
    return;
  }
  challenge.acceptanceRate = Math.round(
    (challenge.solvedCount / challenge.totalSubmissions) * 100,
  );
};

// ─── Controller ───────────────────────────────────────────────────────────────
export const executeCode = async (req, res) => {
  try {
    const clerkIdFromAuth = req.auth.userId;
    const {
      problemId,
      code,
      languageId,
      isSubmit,
      customCases = [],
    } = req.body;

    if (!problemId || !code || !languageId) {
      return res
        .status(400)
        .json({ message: "problemId, code, and languageId are required." });
    }

    const problem =
      (await Problem.findById(problemId).catch(() => null)) ??
      (await Problem.findOne({ problemId }));

    if (!problem)
      return res.status(404).json({ message: "Problem not found." });

    const langKey = getLanguageKey(languageId);
    const runnerCode = problem.runnerCode.get(langKey);

    if (!runnerCode) {
      return res.status(400).json({
        message: `No runner code for language "${langKey}". Add it to problem.runnerCode.`,
      });
    }

    const fullCode = `${code}\n${runnerCode}`;
    const cpuLimit = (problem.timeLimitMs / 1000).toFixed(1);

    // ── Determine which test cases to run ───────────────────────────────────────
    const seedCases = isSubmit
      ? problem.testCases
      : problem.testCases.filter((tc) => !tc.isHidden);

    const allCases = [
      ...seedCases,
      ...customCases.map((tc, i) => ({
        ...tc,
        testCaseId: tc.testCaseId ?? `custom-${i}`,
        isCustom: true,
        isHidden: false,
      })),
    ];

    if (allCases.length === 0) {
      return res.status(400).json({ message: "No test cases to run." });
    }

    const results = await Promise.all(
      allCases.map((tc) => runOnJudge0(fullCode, languageId, tc, cpuLimit)),
    );

    // Check if every test case passed successfully
    const allPassed = results.every((result) => result.isPassed === true);

    let rewardClaimed = false;
    let alreadyClaimed = false;
    let rewardsDistributed = { xp: 0, coins: 0, gems: 0 };

    if (isSubmit) {
      const [challenge, user] = await Promise.all([
        Challenge.findOne({ problemId: problem._id }),
        User.findOne({ clerkId: clerkIdFromAuth }),
      ]);

      if (challenge && user) {
        challenge.totalSubmissions = (challenge.totalSubmissions ?? 0) + 1;

        let userProgress = await UserProgress.findOne({ userId: user._id });
        if (!userProgress) {
          userProgress = new UserProgress({
            userId: user._id,
            challengeProgress: [],
          });
        }

        let entry = userProgress.challengeProgress.find(
          (e) => e.challengeId.toString() === challenge._id.toString(),
        );

        if (!entry) {
          userProgress.challengeProgress.push({
            challengeId: challenge._id,
            solved: false,
            rewardClaimed: false,
          });
          entry = userProgress.challengeProgress.at(-1);
        }

        if (allPassed) {
          if (!entry.solved) {
            entry.solved = true;
            entry.solvedAt = new Date();
            challenge.solvedCount = (challenge.solvedCount ?? 0) + 1;
          }

          if (!entry.rewardClaimed) {
            entry.rewardClaimed = true;
            entry.rewardClaimedAt = new Date();

            const xpGained = challenge.xp ?? challenge.reward?.xp ?? 0;
            const coinsGained = challenge.reward?.coins ?? 0;
            const gemsGained = challenge.reward?.gems ?? 0;

            rewardsDistributed = {
              xp: xpGained,
              coins: coinsGained,
              gems: gemsGained,
            };

            await User.findByIdAndUpdate(user._id, {
              $inc: {
                "stats.xp": xpGained,
                "stats.coins": coinsGained,
                "stats.gems": gemsGained,
              },
            });

            rewardClaimed = true;
          } else {
            rewardsDistributed = {
              xp: challenge.xp ?? challenge.reward?.xp ?? 0,
              coins: challenge.reward?.coins ?? 0,
              gems: challenge.reward?.gems ?? 0,
            };
            alreadyClaimed = true;
          }
        }

        updateAcceptanceRate(challenge);
        await Promise.all([challenge.save(), userProgress.save()]);
      }
    }

    return res.status(200).json({
      results,
      allPassed,
      rewardClaimed,
      alreadyClaimed,
      rewards: rewardsDistributed,
    });
  } catch (error) {
    console.error("Code Execution Error:", error);
    return res
      .status(500)
      .json({ message: "Server error.", error: error.message });
  }
};
