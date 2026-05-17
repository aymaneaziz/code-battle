import mongoose from "mongoose";
import { generateId } from "../../config/idGenerator.js";

const matchHistorySchema = new mongoose.Schema(
  {
    matchHistoryId: {
      type: String,
      unique: true,
      required: true,
      default: () => generateId("match"),
    },

    matchId: { type: String, required: true, index: true },

    // Problem played
    problemId: { type: String, required: true },
    problemTitle: { type: String },
    difficulty: { type: String, enum: ["Easy", "Medium", "Hard", "Extreme"] },

    // How the match ended
    reason: {
      type: String,
      enum: ["all_tests_passed", "hp_zero", "time_expired", "surrender"],
      required: true,
    },

    // Player 1 result
    player1: {
      userId: { type: String, required: true, index: true },
      displayName: { type: String, required: true },
      outcome: { type: String, enum: ["win", "loss", "draw"], required: true },
      eloBefore: { type: Number },
      eloAfter: { type: Number },
      eloDelta: { type: Number },
      xpEarned: { type: Number },
      coinsEarned: { type: Number, default: 0 },
      gemsEarned: { type: Number, default: 0 },
      hpRemaining: { type: Number },
      testsPassed: { type: Number },
      submissions: { type: Number },
      solveTimeMs: { type: Number },
      solvedCode: { type: String, default: null },
    },

    // Player 2 result
    player2: {
      userId: { type: String, required: true, index: true },
      displayName: { type: String, required: true },
      outcome: { type: String, enum: ["win", "loss", "draw"], required: true },
      eloBefore: { type: Number },
      eloAfter: { type: Number },
      eloDelta: { type: Number },
      xpEarned: { type: Number },
      coinsEarned: { type: Number, default: 0 },
      gemsEarned: { type: Number, default: 0 },
      hpRemaining: { type: Number },
      testsPassed: { type: Number },
      submissions: { type: Number },
      solveTimeMs: { type: Number },
      solvedCode: { type: String, default: null },
    },

    durationMs: { type: Number }, // match duration in ms
    playedAt: { type: Date, default: Date.now },
  },
  { timestamps: true },
);

const MatchHistory =
  mongoose.models.MatchHistory ||
  mongoose.model("MatchHistory", matchHistorySchema);

export default MatchHistory;
