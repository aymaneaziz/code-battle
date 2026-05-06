import Rank from "../../models/SystemModels/rank.model.js";
import { seedData } from "../../config/seederEngine.js";

const ranks = [
  {
    rankId: "rank1",
    label: "Bronze",
    minElo: 0,
    maxElo: 499,
    iconUrl: "🥉",
  },
  {
    rankId: "rank2",
    label: "Silver",
    minElo: 500,
    maxElo: 999,
    iconUrl: "🥈",
  },
  {
    rankId: "rank3",
    label: "Gold",
    minElo: 1000,
    maxElo: 1499,
    iconUrl: "🥇",
  },
  {
    rankId: "rank4",
    label: "Diamond",
    minElo: 1500,
    maxElo: 1999,
    iconUrl: "💎",
  },
  {
    rankId: "rank5",
    label: "Platinum",
    minElo: 2000,
    maxElo: 2499,
    iconUrl: "💠",
  },
  {
    rankId: "rank6",
    label: "Master",
    minElo: 2500,
    maxElo: 2999,
    iconUrl: "🏆",
  },
  {
    rankId: "rank7",
    label: "Grandmaster",
    minElo: 3000,
    maxElo: 3499,
    iconUrl: "👑",
  },
  {
    rankId: "rank8",
    label: "Legend",
    minElo: 3500,
    maxElo: 3999,
    iconUrl: "🔥",
  },
];
export const seedRank = () => seedData(Rank, ranks, "rankId");
