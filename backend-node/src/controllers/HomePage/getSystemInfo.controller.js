import systemInfo from "../../models/System/systemInfo.model.js";
import User from "../../models/user.model.js";

const getSystemInfo = async (req, res) => {
  try {
    const clerkId = req.auth.userId;
    const info = await systemInfo.findOne({ _id: "SYSTEM_CONFIG" });
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
    const responce = {
      info,
      playerData,
    };
    res.status(200).json(responce);
  } catch (error) {
    console.error("Error in getSystemInfo:", error);
    res.status(500).json({
      message: "Erreur serveur lors de la récupération des informations",
      error: error.message,
    });
  }
};

export { getSystemInfo };
