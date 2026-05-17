import Leaderboard from "../../models/SystemModels/leaderboard.model.js";
import Rank from "../../models/SystemModels/rank.model.js";

export const getGlobalRank = async (req, res) => {
  try {
    const limit = parseInt(req.params.limit) || 100; // Default to 100 if no limit is provided

    const leaderboard = await Leaderboard.find()
      .populate({
        path: "userId",
        populate: {
          path: "selectedAvatar",
        },
      })
      .sort({ currentGlobalRank: 1 })
      .limit(limit);

    // Filter out entries where userId failed to populate (is null)
    const validEntries = leaderboard.filter((entry) => entry.userId !== null);

    const result = validEntries.map(async (entry) => {
      const player = entry.userId;

      // Default tier fallback just in case no Rank matches the Elo range
      let currentTier = null;
      if (player.stats && player.stats.elo !== undefined) {
        currentTier = await Rank.findOne({
          minElo: { $lte: player.stats.elo },
          maxElo: { $gte: player.stats.elo },
        });
      }

      return {
        currentTier,
        user: player,
        currentGlobalRank: entry.currentGlobalRank,
        bestRank: entry.bestRank,
        bestElo: entry.bestElo,
      };
    });

    const resolvedResult = await Promise.all(result);

    res.status(200).json(resolvedResult);
  } catch (error) {
    console.error("Get global rank error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
