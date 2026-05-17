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

    const progressMap = new Map();
    if (user) {
      const userProgress = await UserProgress.findOne({ userId: user._id })
        .select("challengeProgress")
        .lean();

      for (const entry of userProgress?.challengeProgress ?? []) {
        progressMap.set(entry.challengeId.toString(), {
          solved: entry.solved,
          rewardClaimed: entry.rewardClaimed,
        });
      }
    }

    // Filter dyal  difficulty w title
    let problemMatch = {};
    if (difficulty && difficulty !== "All") {
      problemMatch.difficulty = difficulty;
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
        const prog = progressMap.get(ch._id.toString()) ?? {};
        return {
          id: ch.challengeId,
          title: ch.problemId.title,
          difficulty: ch.problemId.difficulty,
          xp: ch.xp,
          solves: ch.solvedCount,
          winRate: `${ch.acceptanceRate ?? 0}%`,
          status: prog.solved ? "solved" : "unsolved",
          rewardClaimed: prog.rewardClaimed ?? false,
          reward: ch.reward,
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
