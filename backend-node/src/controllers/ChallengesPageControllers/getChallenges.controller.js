import UserProgress from "../../models/SystemModels/userProgress.model.js";
import Challenge from "../../models/GameplayModels/challenge.model.js";
import "../../models/GameplayModels/problem.model.js";
import User from "../../models/user.model.js";

export const getChallenges = async (req, res, next) => {
  try {
    const { difficulty, search, status } = req.query;
    const clerkIdFromAuth = req.auth.userId;

    // Get User and Solved IDs
    const user = await User.findOne({ clerkId: clerkIdFromAuth }).select("_id");
    let solvedChallengeIds = new Set();

    if (user) {
      const userProgress = await UserProgress.findOne({ userId: user._id });
      if (userProgress?.solvedChallenges) {
        userProgress.solvedChallenges.forEach((id) =>
          solvedChallengeIds.add(id.toString()),
        );
      }
    }

    // Build the Problem Match Filter
    let problemMatch = {};
    if (difficulty && difficulty !== "All") {
      problemMatch.difficulty = difficulty.toUpperCase();
    }
    if (search) {
      problemMatch.title = { $regex: search, $options: "i" };
    }

    // Fetch and Populate
    // We filter nested fields using the 'match' property in populate
    const challenges = await Challenge.find({}).populate({
      path: "problemId",
      match: problemMatch,
    });

    // Transform and Filter by Status
    const formattedChallenges = challenges
      .filter((ch) => ch.problemId !== null) // Remove challenges that didn't match difficulty/search
      .map((ch) => {
        const isSolved = solvedChallengeIds.has(ch._id.toString());
        return {
          id: ch.challengeId,
          title: ch.problemId.title,
          difficulty:
            ch.problemId.difficulty.charAt(0) +
            ch.problemId.difficulty.slice(1).toLowerCase(),
          xp: ch.xp,
          solves: ch.solvedCount,
          winRate: `${ch.acceptanceRate}%`,
          status: isSolved ? "solved" : "unsolved",
        };
      });

    // Apply Status Filter (Solved/Unsolved)
    const finalResult =
      status && status !== "All"
        ? formattedChallenges.filter(
            (ch) => ch.status.toLowerCase() === status.toLowerCase(),
          )
        : formattedChallenges;

    res.status(200).json(finalResult);
  } catch (error) {
    console.error("Error fetching challenges:", error);
    next(error);
  }
};
