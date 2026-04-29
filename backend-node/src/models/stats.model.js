import mongoose from "mongoose";

export const statsSchema = new mongoose.Schema(
  {
    elo: { type: Number, default: 400 },
    rank: { type: Number, default: 0 },
    wins: { type: Number, default: 0 },
    losses: { type: Number, default: 0 },
    draws: { type: Number, default: 0 },
    winRate: { type: Number, default: 0.0 },
    totalMatches: { type: Number, default: 0 },
    currentStreak: { type: Number, default: 0 },
    bestStreak: { type: Number, default: 0 },
    xp: { type: Number, default: 0 },
    coin: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    averageSolveTime: { type: Number, default: 0 },
    fastestSolveTime: { type: Number, default: 0 },
    hardestWin: { type: String, default: "None" },
    prefectRuns: { type: Number, default: 0 },
    itemsUsed: { type: Number, default: 0 },
    hintUsed: { type: Number, default: 0 },
  },
  { _id: false },
);
