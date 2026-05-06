import UserProgress from "../../models/SystemModels/userProgress.model.js";
import Challenge from "../../models/GameplayModels/challenge.model.js";
import "../../models/GameplayModels/problem.model.js";
import User from "../../models/user.model.js";

export const getChallenges = async (req, res, next) => {
  try {
    const { difficulty, search, status } = req.query;
    const clerkIdFromAuth = req.auth.userId;

    // Njibu luser mn Bd bach nchofo chno hell (solved)
    const user = await User.findOne({ clerkId: clerkIdFromAuth }).select("_id");
    let solvedChallengeIds = new Set();

    if (user) {
      const userProgress = await UserProgress.findOne({ userId: user._id });
      if (userProgress?.solvedChallenges) {
        // Kandirohom f Set bach lrecherche ikoun khfif o omptimizer
        userProgress.solvedChallenges.forEach((id) =>
          solvedChallengeIds.add(id.toString()),
        );
      }
    }

    // Filter dyal  difficulty w title
    let problemMatch = {};
    if (difficulty && difficulty !== "All") {
      problemMatch.difficulty = difficulty.toUpperCase();
    }
    if (search) {
      problemMatch.title = { $regex: search, $options: "i" }; // "i" bach ignore case
    }

    // Kandiro populate bach njibu lproblem li lié b lchallenge
    const challenges = await Challenge.find({}).populate({
      path: "problemId",
      match: problemMatch,
    });

    // Nettoyage dyal les données
    const formattedChallenges = challenges
      .filter((ch) => ch.problemId !== null) // Nhaydo li mal9awch fihom match
      .map((ch) => {
        const isSolved = solvedChallengeIds.has(ch._id.toString());
        return {
          id: ch.challengeId,
          title: ch.problemId.title,
          difficulty: ch.problemId.difficulty,
          xp: ch.xp,
          solves: ch.solvedCount,
          winRate: `${ch.acceptanceRate}%`,
          status: isSolved ? "solved" : "unsolved",
        };
      });

    // Ila khtar luser filter b status (solved/unsolved)
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
