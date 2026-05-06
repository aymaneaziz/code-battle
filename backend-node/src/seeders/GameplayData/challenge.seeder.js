import Challenge from "../../models/GameplayModels/challenge.model.js";
import Problem from "../../models/GameplayModels/problem.model.js";
import { seedData } from "../../config/seederEngine.js";

export const seedChallenges = async () => {
  const heapProblem = await Problem.findOne({ slug: "sorting-by-heap" });
  const maxProblem = await Problem.findOne({ slug: "max-value" });
  const tribonacciProblem = await Problem.findOne({
    slug: "tribonacci-sequence",
  });

  if (!heapProblem || !maxProblem || !tribonacciProblem) {
    console.error("Please run seedProblems before seedChallenges!");
    return;
  }

  const challenges = [
    {
      challengeId: "ch_sorting_heap",
      problemId: heapProblem._id,
      xp: 500,
      reward: { coins: 150, gems: 5 },
      isDaily: false,
      solvedCount: 120,
      acceptanceRate: 38,
    },
    {
      challengeId: "ch_max_value",
      problemId: maxProblem._id,
      xp: 60,
      reward: { coins: 20 },
      isDaily: false,
      solvedCount: 3040,
      acceptanceRate: 90,
    },
    {
      challengeId: "ch_tribonacci_daily",
      problemId: tribonacciProblem._id,
      xp: 80,
      reward: { coins: 50, gems: 2 },
      isDaily: true,
      solvedCount: 0,
      acceptanceRate: 0,
    },
  ];

  await seedData(Challenge, challenges, "challengeId"); // Zid dymn awit hna bach matsbbch mochkill
};
