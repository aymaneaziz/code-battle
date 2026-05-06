import Challenge from "../../models/GameplayModels/challenge.model.js";
import Problem from "../../models/GameplayModels/problem.model.js";
import { seedData } from "../../config/seederEngine.js";

export const seedChallenges = async () => {
  // 1. Fetch all problems to get their current MongoDB _ids
  const allProbs = await Problem.find({});

  // 2. Create a helper map: { "slug": "mongo_id" }
  const probMap = {};
  allProbs.forEach((p) => (probMap[p.slug] = p._id));

  if (allProbs.length === 0) {
    console.error("❌ No problems found. Run seedProblems first!");
    return;
  }

  const challenges = [
    {
      challengeId: "ch_sorting_heap",
      problemId: probMap["sorting-by-heap"],
      xp: 500,
      reward: { coins: 150, gems: 5 },
      isDaily: false,
      solvedCount: 120,
      acceptanceRate: 38,
    },
    {
      challengeId: "ch_max_value",
      problemId: probMap["max-value"],
      xp: 60,
      reward: { coins: 20 },
      isDaily: false,
      solvedCount: 3040,
      acceptanceRate: 90,
    },
    {
      challengeId: "ch_tribonacci_daily",
      problemId: probMap["tribonacci-sequence"],
      xp: 80,
      reward: { coins: 50, gems: 2 },
      isDaily: true, // This is your Daily Challenge
      solvedCount: 450,
      acceptanceRate: 65,
    },
    {
      challengeId: "ch_palindrome",
      problemId: probMap["valid-palindrome"],
      xp: 40,
      reward: { coins: 15 },
      isDaily: false,
      solvedCount: 12500,
      acceptanceRate: 95,
    },
    {
      challengeId: "ch_coin_change",
      problemId: probMap["coin-change"],
      xp: 250,
      reward: { coins: 100, gems: 3 },
      isDaily: false,
      solvedCount: 890,
      acceptanceRate: 42,
    },
    {
      challengeId: "ch_n_queens",
      problemId: probMap["n-queens"],
      xp: 1000,
      reward: { coins: 500, gems: 20 },
      isDaily: false,
      solvedCount: 45,
      acceptanceRate: 12,
    },
  ];

  // Filter out any challenges where the problemId wasn't found (safety)
  const validChallenges = challenges.filter((c) => c.problemId);

  await seedData(Challenge, validChallenges, "challengeId");
};
