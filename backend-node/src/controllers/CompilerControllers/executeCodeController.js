import { JUDGE0_API_URL } from "../../config/env.js";
import Problem from "../../models/GameplayModels/problem.model.js";

// ─── Helpers ────────────────────────────────────────────────────────────────
const LANGUAGE_KEY_MAP = {
  71: "python", // Python 3
  70: "python", // Python 2
  63: "javascript",
};
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
    const runnerCode = problem.runnerCode?.[langKey];

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

    return res.status(200).json(results);
  } catch (error) {
    console.error("Code Execution Error:", error);
    return res
      .status(500)
      .json({ message: "Server error.", error: error.message });
  }
};
