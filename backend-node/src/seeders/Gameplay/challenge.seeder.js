// Had file kay7kem f'insertion dial data dyal challenges f DB (seeding)

import Challenge from "../../models/Gameplay/Challenge.model.js"; // Model dyal challenges
import Problem from "../../models/Gameplay/problem.model.js"; // Model dyal problems related l'challenge
import { seedData } from "../seederEngine.js"; // function li kat3awn bach nseedaw data ila ma kanoch mwjoudd

export const seedChallenges = async () => {
  // Jbed awal 2 problems mn DB bach nst3mlohom ka ref f challenges
  const problems = await Problem.find().limit(2);

  // Liste dyal challenges li ghadi ndkhlou
  const challenges = [
    {
      challengeId: "ch1", // id unique bach n9arno fih f seed
      problemId: problems[0]._id, // reference l'problem
      xp: 150, // xp: points li ykhdem user mlli y7ell
      reward: { coins: 20 }, // reward: récompenses (coins...)
      solvedCount: 100, // solvedCount: nombre de solutions (default)
      acceptanceRate: 0.99, // acceptanceRate: taux d'acceptance
    },
    {
      challengeId: "ch2",
      problemId: problems[1]._id,
      xp: 250,
      reward: { coins: 40, gems: 1 }, // reward avec coins w gems
      solvedCount: 50,
      acceptanceRate: 0.79,
    },
  ];

  // N3ayto 3la seedData bach nsave l'challenges ila ma kanouch; on utilise "challengeId" comme key bach nqarnu
  seedData(Challenge, challenges, "challengeId");
};
