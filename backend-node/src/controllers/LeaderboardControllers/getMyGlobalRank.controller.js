import Leaderboard from "../../models/SystemModels/leaderboard.model.js";
import User from "../../models/user.model.js";
import Rank from "../../models/SystemModels/rank.model.js";

export const getMyGlobalRank = async (req, res) => {
  try {
    const clerkId = req.auth.userId;
    const user = await User.findOne({ clerkId }).populate("selectedAvatar");

    if (!user) {
      return res.status(404).json({ message: "User not found in system" });
    }

    // Find the user's current tier based on their Elo
    const currentTier = await Rank.findOne({
      minElo: { $lte: user.stats.elo },
      maxElo: { $gte: user.stats.elo },
    });

    const userRank = await Leaderboard.findOne({ userId: user._id });

    // Handle the case where the user is valid but not tracked on the leaderboard yet
    if (!userRank) {
      return res.status(200).json({
        currentTier,
        user,
        currentGlobalRank: null, // "Unranked" or "-" on the frontend
        bestRank: null,
        bestElo: user.stats.elo,
      });
    }

    res.status(200).json({
      currentTier,
      user,
      currentGlobalRank: userRank.currentGlobalRank,
      bestRank: userRank.bestRank,
      bestElo: userRank.bestElo,
    });
  } catch (error) {
    console.error("Get my global rank error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
