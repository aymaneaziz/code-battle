import Challenge from "../../models/GameplayModels/challenge.model.js";
import "../../models/GameplayModels/problem.model.js";
import UserProgress from "../../models/SystemModels/userProgress.model.js";
import User from "../../models/user.model.js";

const getChallengeById = async (req, res) => {
  try {
    const { challengeId } = req.params;
    const clerkId = req.auth.userId;

    const challenge = await Challenge.findOne({ challengeId }).populate(
      "problemId",
      "-runnerCode",
    );

    if (!challenge) {
      return res.status(404).json({ message: "Challenge not found" });
    }

    let rewardClaimed = false;
    const user = await User.findOne({ clerkId }).select("_id").lean();
    if (user) {
      const prog = await UserProgress.findOne({ userId: user._id })
        .select("challengeProgress")
        .lean();

      const entry = prog?.challengeProgress?.find(
        (e) => e.challengeId.toString() === challenge._id.toString(),
      );
      rewardClaimed = entry?.rewardClaimed ?? false;
    }

    res
      .status(200)
      .json({ ...challenge.toObject({ flattenMaps: true }), rewardClaimed });
  } catch (error) {
    console.error("Error fetching specific challenge:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export default getChallengeById;
