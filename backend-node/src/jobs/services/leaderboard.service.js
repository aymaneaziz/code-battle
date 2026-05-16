import Leaderboard from "../../models/SystemModels/leaderboard.model.js";
import System from "../../models/SystemModels/system.model.js";
import User from "../../models/user.model.js";

export const globalRank = async () => {
  try {
    const users = await User.find()
      .select("stats.elo")
      .sort({ "stats.elo": -1 });

    if (users.length === 0) {
      console.log("No users found");
      return;
    }

    for (let i = 0; i < users.length; i++) {
      const user = users[i];
      const rank = i + 1;

      await Leaderboard.findOneAndUpdate(
        { userId: user._id },
        {
          $set: {
            currentGlobalRank: rank,
            bestElo: user.stats.elo,
          },
          $min: {
            bestRank: rank,
          },
        },
        { upsert: true }
      );

      user.stats.globalRank = rank;
      user.save();
    }

    await System.findByIdAndUpdate("SYSTEM_CONFIG", {
      lastLeatherboardUpdate: new Date(),
    });
    console.log("Global leaderboard updated");
  } catch (error) {
    console.error("Leaderboard error:", error);
  }
};
