import MatchHistory from "../../../models/GameplayModels/matchHistory.model.js";

const DIFFICULTY_RANK = { Easy: 1, Medium: 2, Hard: 3, Extreme: 4 };

export const recomputeSolveStats = async (userId) => {
  const userStr = String(userId);

  const histories = await MatchHistory.find({
    $or: [{ "player1.userId": userStr }, { "player2.userId": userStr }],
  })
    .select("difficulty player1 player2")
    .lean();

  const solveTimes = [];
  let hardestWin = "None";

  for (const h of histories) {
    const isP1 = String(h.player1?.userId) === userStr;
    const ps = isP1 ? h.player1 : h.player2;

    if (!ps) continue;

    // Track execution timing separately only if they passed all test parameters
    if (ps.solveTimeMs !== undefined && ps.solveTimeMs !== null) {
      solveTimes.push(ps.solveTimeMs);
    }

    // Evaluate hardest win difficulty rating level accurately
    if (ps.outcome === "win") {
      const difficulty = h.difficulty ?? "Easy";

      const currentRank = DIFFICULTY_RANK[difficulty] ?? 0;
      const highestRank = DIFFICULTY_RANK[hardestWin] ?? 0;

      if (currentRank > highestRank) {
        hardestWin = difficulty;
      }
    }
  }

  return {
    fastestSolveTime: solveTimes.length > 0 ? Math.min(...solveTimes) : 0,
    averageSolveTime:
      solveTimes.length > 0
        ? Math.round(solveTimes.reduce((a, b) => a + b, 0) / solveTimes.length)
        : 0,
    hardestWin,
  };
};
