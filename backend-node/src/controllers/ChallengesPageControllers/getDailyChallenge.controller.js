import Challenge from "../../models/GameplayModels/challenge.model.js";
import "../../models/GameplayModels/problem.model.js";

export const getDailyChallenge = async (req, res) => {
  try {
    // Look for the challenge where isDaily is true
    const daily = await Challenge.findOne({ isDaily: true }).populate(
      "problemId",
    );

    if (!daily) {
      // If none marked as daily, return the latest challenge as fallback
      const latest = await Challenge.findOne()
        .sort({ createdAt: -1 })
        .populate("problemId");
      return res.status(200).json(latest);
    }

    return res.status(200).json(daily);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
