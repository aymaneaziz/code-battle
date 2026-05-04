import User from "../../models/user.model.js";
import Rank from "../../models/System/rank.model.js";

const getPlayerData = async (req, res) => {
  try {
    const clerkId = req.auth.userId;
    const playerData = await User.findOne({ clerkId })
      .populate("selectedAvatar")
      .select({
        displayName: 1,
        username: 1,
        "stats.rank": 1,
        "stats.elo": 1,
        "stats.prefectRuns": 1,
        "state.winRate": 1,
        "state.currentStreak": 1,
        "state.xp": 1,
      });
    const rank = await Rank.findOne({
      minElo: { $lte: playerData.stats.elo },
      maxElo: { $gte: playerData.stats.elo },
    });
    res.status(200).json({
      playerData,
      rank,
    });
    console.log("Les données de /api/home/player on été envoyées avec succés");
  } catch (error) {
    console.error("Error in getSystemInfo:", error);
    res.status(500).json({
      message: "Erreur serveur lors de la récupération des informations",
      error: error.message,
    });
  }
};

export { getPlayerData };
