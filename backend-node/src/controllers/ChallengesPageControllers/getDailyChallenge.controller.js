import Challenge from "../../models/GameplayModels/challenge.model.js";
import "../../models/GameplayModels/problem.model.js";
import UserProgress from "../../models/SystemModels/userProgress.model.js";
import User from "../../models/user.model.js";

export const getDailyChallenge = async (req, res) => {
  try {
    const clerkId = req.auth.userId;

    // Look for the challenge where isDaily is true
    const manualDaily = await Challenge.findOne({ isDaily: true })
      .populate("problemId")
      .lean();

    let daily = manualDaily;

    if (!daily) {
      const daysSinceEpoch = Math.floor(Date.now() / 86_400_000);
      const count = await Challenge.countDocuments();

      if (count === 0)
        return res.status(404).json({ message: "No challenges found." });

      const skip = daysSinceEpoch % count;
      daily = await Challenge.findOne()
        .sort({ createdAt: 1 }) // consistent ordering
        .skip(skip)
        .populate("problemId")
        .lean();
    }

    if (!daily) return res.status(404).json({ message: "No daily challenge." });

    const user = await User.findOne({ clerkId }).select("_id").lean();
    let rewardClaimed = false;

    if (user) {
      const prog = await UserProgress.findOne({ userId: user._id })
        .select("challengeProgress")
        .lean();

      const entry = prog?.challengeProgress?.find(
        (e) => e.challengeId.toString() === daily._id.toString(),
      );
      rewardClaimed = entry?.rewardClaimed ?? false;
    }

    res.status(200).json({ ...daily, rewardClaimed });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
