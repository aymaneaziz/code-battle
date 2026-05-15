import MissionInstance from "../../models/GameplayModels/missionInstance.model.js";
import User from "../../models/user.model.js";
import UserMissionProgress from "../../models/SystemModels/userMissionProgress.model.js";
import "../../models/GameplayModels/mission.model.js";

export const putProgress = async (req, res) => {
  try {
    const type = req.body.type;

    const clerkId = req.auth.userId;
    const user = await User.findOne({ clerkId });

    const dailyLoginMissions = (
      await MissionInstance.find().populate({
        path: "mission",
        match: { type: type },
      })
    ).filter((m) => m.mission);

    for (const item of dailyLoginMissions) {
      const track = await UserMissionProgress.findOneAndUpdate(
        {
          userId: user._id,
          missionInstanceId: item._id,
        },
        {
          $setOnInsert: {
            userId: user._id,
            missionInstanceId: item._id,
            category: item.category,
            progress: 1,
            isCompleted: false,
            isClaimed: false,
          },
        },
        {
          upsert: true,
          returnDocument: "after",
        }
      );

      // stop si déjà terminé
      if (track.isCompleted) continue;

      // déjà compté aujourd’hui
      if (
        type === "DAILY_LOGIN" &&
        track.updatedAt &&
        isSameMoroccoDay(track.updatedAt)
      ) {
        continue;
      }

      // increment manuel
      track.progress++;

      // completion
      if (track.progress >= item.target) {
        track.isCompleted = true;
        track.completedAt = new Date();
      }

      await track.save();
    }

    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

const isSameMoroccoDay = (date) => {
  const today = new Date().toLocaleDateString("en-CA", {
    timeZone: "Africa/Casablanca",
  });

  const target = new Date(date).toLocaleDateString("en-CA", {
    timeZone: "Africa/Casablanca",
  });

  return today === target;
};
