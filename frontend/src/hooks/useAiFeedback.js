import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";

import { askGroq } from "@/features/home/services/groqAiApi";
import { fetchMatchHistory } from "@/features/home/services/homeApi";

export function useAiFeedback() {
  const { getToken } = useAuth();

  const [feedback, setFeedback] = useState(null);
  const [lastMatch, setLastMatch] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = async () => {
    setLoading(true);
    setError(null);

    try {
      const token = await getToken();
      const history = await fetchMatchHistory(token);

      // Player has no match history yet show empty state, not an error
      if (!history?.length) {
        setLastMatch(null);
        setFeedback(null);
        return;
      }

      const match = history[0]; // Most recent match
      setLastMatch(match);

      const prompt = buildPrompt(match);
      const rawText = await askGroq(prompt);
      const parsed = parseResponse(rawText);

      setFeedback(parsed);
    } catch (err) {
      console.error("[useAiFeedback]", err);
      setError(err.message ?? "Failed to get AI feedback.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    load();
  }, []);

  return { feedback, lastMatch, loading, error, refresh: load };
}

// Prompt builder
function buildPrompt(match) {
  const solveTime = match.solveTimeMs
    ? `${Math.round(match.solveTimeMs / 1000)} seconds`
    : "did not finish all tests";

  const hp = match.hpRemaining != null ? `${match.hpRemaining}/100` : "unknown";

  const REASON_LABEL = {
    all_tests_passed: "passed all test cases",
    hp_zero: "HP reached zero",
    time_expired: "time ran out",
    surrender: "surrendered",
  };

  return `
You are an expert competitive programming coach reviewing a player's coding battle performance and his Code.

Match summary:
- Problem: "${match.problemTitle ?? "Unknown"}" (${match.difficulty ?? "Unknown"} difficulty)
- solvedCode : ${match.solvedCode}
- Result: ${match.outcome} — match ended because the player ${REASON_LABEL[match.reason] ?? match.reason}
- Tests passed: ${match.testsPassed ?? 0}
- Total submissions made: ${match.submissions ?? 1}
- Time to solve: ${solveTime}
- HP remaining at end: ${hp}
- ELO change: ${match.eleDelta >= 0 ? "+" : ""}${match.eleDelta ?? 0}

Based only on these statistics, give a coaching analysis.

Rules:
- Be specific and actionable, not generic
- Adjust tone to the outcome (encouraging for wins, honest for losses)
- Keep each field concise (2–3 sentences max per section)
- suggestions must be practical things the player can do differently next time

Respond ONLY with a valid JSON object. No markdown, no backticks, no text outside the JSON.

{
  "summary": "one sentence overall verdict",
  "quality": "assessment of code quality based on submission count and HP lost",
  "optimization": "assessment of speed and efficiency based on solve time and test results",
  "suggestions": ["tip 1", "tip 2", "tip 3"],
  "score": <integer from 0 to 100>
}
`.trim();
}

// ── Response parser
function parseResponse(raw) {
  const cleaned = raw
    .replace(/```json/gi, "")
    .replace(/```/g, "")
    .trim();

  try {
    return validateShape(JSON.parse(cleaned));
  } catch {
    const match = cleaned.match(/\{[\s\S]*\}/);
    if (match) {
      try {
        return validateShape(JSON.parse(match[0]));
      } catch {}
    }

    // return the raw text as the summary
    return {
      summary: cleaned.slice(0, 300),
      quality: "",
      optimization: "",
      suggestions: [],
      score: 50,
    };
  }
}

function validateShape(obj) {
  return {
    summary:
      typeof obj.summary === "string" ? obj.summary : "No summary available.",
    quality: typeof obj.quality === "string" ? obj.quality : "",
    optimization: typeof obj.optimization === "string" ? obj.optimization : "",
    suggestions: Array.isArray(obj.suggestions)
      ? obj.suggestions.filter((s) => typeof s === "string")
      : [],
    score:
      typeof obj.score === "number"
        ? Math.max(0, Math.min(100, Math.round(obj.score)))
        : 50,
  };
}
