import User from "../../models/user.model.js";

import "../../models/PlayerInfoModels/badge.model.js";
import "../../models/PlayerSetupModels/avatar.model.js";
import "../../models/PlayerSetupModels/language.model.js";
import "../../models/PlayerSetupModels/codingExperience.model.js";
import Rank from "../../models/SystemModels/rank.model.js";
import Level from "../../models/SystemModels/level.model.js";
import { recomputeSolveStats } from "./Utils/recomputeSolveStats.js";

const getProfilePlayer = async (req, res) => {
  try {
    const clerkId = req.auth.userId;

    const player = await User.findOne({ clerkId })
      .populate("selectedAvatar")
      .populate("preferences.language")
      .populate("preferences.codingExperience")
      .populate("preferences.battlePreference")
      .populate("unlockedAvatars")
      .populate("badgesPlayer.badge");

    if (!player) return res.status(404).json({ message: "Player not found" });

    // Fix winRate
    const total = player.stats.wins + player.stats.losses;
    if (total > 0 && player.stats.totalMatches !== total) {
      player.stats.totalMatches = total;
      player.stats.winRate = Math.round((player.stats.wins / total) * 100);
    }

    // Rank + Level
    const [currentRank, currentLevel] = await Promise.all([
      Rank.findOne({
        minElo: { $lte: player.stats.elo },
        maxElo: { $gte: player.stats.elo },
      }),
      Level.findOne({
        minXp: { $lte: player.stats.xp },
        maxXp: { $gte: player.stats.xp },
      }),
    ]);

    if (currentLevel) player.stats.level = currentLevel.levelNumber;

    // Recompute solve stats accurately from match history
    const solveStats = await recomputeSolveStats(player.userId);
    player.stats.fastestSolveTime = solveStats.fastestSolveTime;
    player.stats.averageSolveTime = solveStats.averageSolveTime;
    player.stats.hardestWin = solveStats.hardestWin;

    player.lastActive = new Date();
    player.status = "online";
    player.markModified("stats");
    await player.save();

    res.status(200).json({
      userId: player.userId,
      username: player.username,
      displayName: player.displayName,
      bio: player.bio,
      location: player.location,
      status: player.status,
      selectedAvatar: player.selectedAvatar,
      unlockedAvatars: player.unlockedAvatars,
      badgesPlayer: player.badgesPlayer,
      preferences: player.preferences,
      stats: player.stats,
      level: currentLevel,
      rank: currentRank,
      lastActive: player.lastActive,
      createdAt: player.createdAt,
    });
  } catch (error) {
    console.error("Error in getProfilePlayer:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};
export { getProfilePlayer };
