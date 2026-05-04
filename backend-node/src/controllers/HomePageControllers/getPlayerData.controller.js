import User from "../../models/user.model.js";
import Rank from "../../models/SystemModels/rank.model.js";

const getPlayerData = async (req, res) => {
  try {
    const clerkId = req.auth.userId;
    // kanjib luser o kandir populate lavatar dialo
    const playerData = await User.findOne({ clerkId })
      .populate("selectedAvatar")
      .select("displayName username stats"); // select cleaner hna

    if (!playerData) {
      return res.status(404).json({ message: "Player not found" });
    }

    // kanqalbo 3la rank lmonasib 3la hsab Elo dialo
    const rank = await Rank.findOne({
      minElo: { $lte: playerData.stats.elo },
      maxElo: { $gte: playerData.stats.elo },
    });

    res.status(200).json({ playerData, rank });
  } catch (error) {
    // dima dir console.error bach tchof lmouchkil f terminal m9ad
    console.error(error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export { getPlayerData };
