import { JUDGE0_API_URL } from "../../config/env.js";
import Problem from "../../models/GameplayModels/problem.model.js";
import Challenge from "../../models/GameplayModels/challenge.model.js";
import UserProgress from "../../models/SystemModels/userProgress.model.js";
import User from "../../models/user.model.js";
import { LANGUAGE_KEY_MAP } from "./languageKeyMap.js";
// ─── Helpers ────────────────────────────────────────────────────────────────
const getLanguageKey = (id) => LANGUAGE_KEY_MAP[Number(id)] ?? "javascript";

// Base64 encoding/decoding for Judge0 API (which we use in base64 mode to support Unicode and avoid escaping issues)
const toBase64 = (s) => Buffer.from(String(s ?? "")).toString("base64");
const fromBase64 = (s) =>
  Buffer.from(String(s ?? ""), "base64").toString("utf-8");

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

  return {
    testCaseId: tc.testCaseId,
    status: result.status?.description ?? "Unknown Error",
    statusId: result.status?.id,
    stdout: result.stdout ? fromBase64(result.stdout).trim() : null,
    stderr: result.stderr ? fromBase64(result.stderr).trim() : null,
    compile_output: result.compile_output
      ? fromBase64(result.compile_output).trim()
      : null,
    expectedOutput,
    time: result.time,
    memory: result.memory,
    isHidden: tc.isHidden ?? false,
    isCustom: tc.isCustom ?? false,
    isPassed: result.status?.id === 3,
  };
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

    // Combine seed and custom cases, ensuring custom cases have unique IDs and are marked as such
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
    let rewardsDistributed = { xp: 0, coins: 0, gems: 0 };

    if (isSubmit && allPassed) {
      const challenge = await Challenge.findOne({ problemId: problem._id });
      const user = await User.findOne({ clerkId: clerkIdFromAuth });

      if (challenge && user) {
        // Find or create a single user progress record
        let userProgress = await UserProgress.findOne({ userId: user._id });
        if (!userProgress) {
          userProgress = new UserProgress({
            userId: user._id,
            solvedChallenges: [],
            status: "unsolved",
          });
        }

        // Check if this challenge is already marked as solved
        const alreadySolved = userProgress.solvedChallenges.some(
          (id) => id.toString() === challenge._id.toString(),
        );

        if (!alreadySolved) {
          // Push to arrays and save state status
          userProgress.solvedChallenges.push(challenge._id);
          userProgress.status = "solved";
          userProgress.completedAt = new Date();
          await userProgress.save();

          // Safely map rewards from the challenge schema
          const xpGained = challenge.xp || challenge.reward?.xp || 0;
          const coinsGained = challenge.reward?.coins || 0;
          const gemsGained = challenge.reward?.gems || 0;

          rewardsDistributed = {
            xp: xpGained,
            coins: coinsGained,
            gems: gemsGained,
          };

          // Increment values within nested profile objects using dot notation counters
          await User.findByIdAndUpdate(user._id, {
            $inc: {
              "stats.xp": xpGained,
              "stats.coins": coinsGained,
              "stats.gems": gemsGained,
            },
          });

          // Update general challenge tracking
          challenge.solvedCount += 1;
          await challenge.save();

          rewardClaimed = true;
        } else {
          rewardsDistributed = {
            xp: challenge.xp || challenge.reward?.xp || 0,
            coins: challenge.reward?.coins || 0,
            gems: challenge.reward?.gems || 0,
          };
        }
      }
    }

    return res.status(200).json({
      results,
      allPassed,
      rewardClaimed,
      rewards: rewardsDistributed,
    });
  } catch (error) {
    console.error("Code Execution Error:", error);
    return res
      .status(500)
      .json({ message: "Server error.", error: error.message });
  }
};
