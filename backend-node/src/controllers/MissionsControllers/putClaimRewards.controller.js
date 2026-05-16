import MissionInstance from "../../models/GameplayModels/missionInstance.model.js";
import User from "../../models/user.model.js";
import UserMissionProgress from "../../models/SystemModels/userMissionProgress.model.js";
import "../../models/GameplayModels/mission.model.js";

export const putClaimRewards = async (req, res) => {
  try {
    const missionInstanceId = req.body.missionInstanceId;

    const clerkId = req.auth.userId;
    const user = await User.findOne({ clerkId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const progress = await UserMissionProgress.findOne({
      userId: user._id,
      missionInstanceId,
    });

    if (!progress) {
      return res.status(404).json({ message: "Mission progress not found" });
    }

    if (progress.isClaimed) {
      return res.status(400).json({ message: "Reward already claimed" });
    }

    if (!progress.isCompleted) {
      return res.status(400).json({ message: "Mission not completed yet" });
    }

    const rewardPrices = await MissionInstance.findById(
      missionInstanceId
    ).select("rewardPrices");

    if (!rewardPrices) {
      return res.status(404).json({ message: "Mission instance not found" });
    }

    for (const reward of rewardPrices.rewardPrices) {
      if (!reward || !reward.rewardType || typeof reward.amount !== "number") {
        continue;
      }
      const key = reward.rewardType.toLowerCase();
      if (!user.stats) {
        user.stats = {};
      }
      user.stats[key] = (user.stats[key] || 0) + reward.amount;
    }

    await user.save();
    await UserMissionProgress.findByIdAndUpdate(progress._id, {
      isClaimed: true,
    });

    return res.status(200).json({ message: "Reward claimed successfully" });
  } catch (error) {
    console.error(error);

    return res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
