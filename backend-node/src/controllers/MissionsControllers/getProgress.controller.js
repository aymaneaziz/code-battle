import UserMissionProgress from "../../models/SystemModels/userMissionProgress.model.js";
import User from "../../models/user.model.js";
import MissionInstance from "../../models/GameplayModels/missionInstance.model.js";
import "../../models/GameplayModels/mission.model.js";

export const getProgress = async (req, res) => {
  try {
    const clerkId = req.auth.userId;
    const user = await User.findOne({ clerkId });

    if (!user) {
      return res.status(404);
    }

    const [missions, tracker] = await Promise.all([
      MissionInstance.find().select("category").lean(),

      UserMissionProgress.find({
        userId: user._id,
      })
        .select("isCompleted missionInstanceId")
        .populate("missionInstanceId", "category")
        .lean(),
    ]);

    if (!missions.length) {
      return res.status(200).json(null);
    }

    const stats = {
      DAILY: 0,
      WEEKLY: 0,
      SEASONAL: 0,
    };

    for (const mission of missions) {
      stats[mission.category]++;
    }

    const completedStats = {
      DAILY: 0,
      WEEKLY: 0,
      SEASONAL: 0,
    };

    for (const track of tracker) {
      if (!track.isCompleted) continue;

      completedStats[track.missionInstanceId.category]++;
    }

    return res.status(200).json({
      dailyMissions: stats.DAILY,
      weeklyMissions: stats.WEEKLY,
      seasonalMissions: stats.SEASONAL,

      completedDailyMissions: completedStats.DAILY,
      completedWeeklyMissions: completedStats.WEEKLY,
      completedSeasonalMissions: completedStats.SEASONAL,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
