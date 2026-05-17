import MatchHistory from "../../models/GameplayModels/matchHistory.model.js";
import User from "../../models/user.model.js";

export const getMatchHistory = async (req, res) => {
  try {
    const clerkId = req.auth.userId;
    const player = await User.findOne({ clerkId }).select("userId").lean();

    if (!player) return res.status(404).json({ message: "Player not found" });

    const userId = player.userId;

    const histories = await MatchHistory.find({
      $or: [{ "player1.userId": userId }, { "player2.userId": userId }],
    })
      .sort({ playedAt: -1 }) // newest first
      .limit(20)
      .lean();

    const shaped = histories.map((h) => {
      const isP1 = h.player1.userId === userId;
      const me = isP1 ? h.player1 : h.player2;
      const opp = isP1 ? h.player2 : h.player1;

      return {
        matchHistoryId: h.matchHistoryId,
        matchId: h.matchId,
        problemTitle: h.problemTitle,
        difficulty: h.difficulty,
        reason: h.reason,
        playedAt: h.playedAt,
        durationMs: h.durationMs,

        // My side
        outcome: me.outcome,
        eleDelta: me.eloDelta,
        eloBefore: me.eloBefore,
        eloAfter: me.eloAfter,
        xpEarned: me.xpEarned,
        coinsEarned: me.coinsEarned,
        gemsEarned: me.gemsEarned,
        hpRemaining: me.hpRemaining,
        testsPassed: me.testsPassed,
        submissions: me.submissions,
        solveTimeMs: me.solveTimeMs,
        solvedCode: me.solvedCode,

        // Opponent side
        opponent: {
          userId: opp.userId,
          displayName: opp.displayName,
          outcome: opp.outcome,
          eloBefore: opp.eloBefore,
          eloAfter: opp.eloAfter,
        },
      };
    });

    res.status(200).json(shaped);
  } catch (error) {
    console.error("Error in getMatchHistory:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
