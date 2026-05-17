import UserProgress from "../../models/SystemModels/userProgress.model.js";
import User from "../../models/user.model.js";

import Challenge from "../../models/GameplayModels/challenge.model.js";
import "../../models/GameplayModels/problem.model.js";
export const getUserProgress = async (req, res) => {
  try {
    const clerkId = req.auth.userId;
    const user = await User.findOne({ clerkId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Get all challenges and populate problems
    const allChallenges = await Challenge.find().populate("problemId");
    const userProgress = await UserProgress.findOne({ userId: user._id })
      .select("challengeProgress")
      .lean();

    // Create a Set for faster lookup
    const solvedIds = new Set(
      (userProgress?.challengeProgress ?? [])
        .filter((e) => e.solved)
        .map((e) => e.challengeId.toString()),
    );

    const difficulties = ["Easy", "Medium", "Hard", "Extreme"];

    // Kandiro boucle bach nhsbo chhal mn wahda hel f koulla niveau
    const stats = difficulties.map((diff) => {
      // Njibu ga3 les challenges dyal had ldifficulty
      const inDiff = allChallenges.filter(
        (c) => c.problemId?.difficulty === diff,
      );
      // Nhsbo chhal mn wahda hel fihom
      const solved = inDiff.filter((c) => solvedIds.has(c._id.toString()));
      return {
        label: diff,
        solved: solved.length,
        total: inDiff.length,
      };
    });

    res.json(stats);
  } catch (error) {
    console.error("Progress Controller Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
