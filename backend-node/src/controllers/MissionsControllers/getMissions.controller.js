import MissionInstance from "../../models/GameplayModels/missionInstance.model.js";
import User from "../../models/user.model.js";
import UserMissionProgress from "../../models/SystemModels/userMissionProgress.model.js";
import "../../models/GameplayModels/mission.model.js";

export const getMission = async (req, res) => {
  try {
    const missionCategory = req.params.missionCategory;

    const clerkId = req.auth.userId;
    const user = await User.findOne({ clerkId });

    if (!user) {
      return res.status(404);
    }

    const [missions, tracker] = await Promise.all([
      MissionInstance.find({
        category: missionCategory,
      })
        .populate("mission")
        .lean(),

      UserMissionProgress.find({
        userId: user._id,
        category: missionCategory,
      }).lean(),
    ]);

    if (!missions.length) {
      return res.status(200).json(null);
    }

    const updatedMissions = missions.map((mission) => {
      const track = tracker.find(
        (t) => t.missionInstanceId.toString() === mission._id.toString()
      );

      if (!track) return { ...mission, progress: 0 };

      return {
        ...mission,
        progress: track.progress,
        isCompleted: track.isCompleted,
        isClaimed: track.isClaimed,
      };
    });

    return res.status(200).json(updatedMissions);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
