import mongoose from "mongoose";
import { generateId } from "../../config/idGenerator.js";

const problemSchema = new mongoose.Schema(
  {
    problemId: {
      type: String,
      required: true,
      unique: true,
      default: () => generateId("problem"),
    },
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    timeLimitMs: { type: Number, default: 1000 },
    timeArenaS: { type: Number, default: 900 }, // 15 min
    tags: { type: [String], required: true },
    returnType: { type: String, required: true },
    functionName: { type: String, required: true },

    difficulty: {
      type: String,
      enum: ["Easy", "Medium", "Hard", "Extreme"],
      default: "Easy",
    },

    examples: [
      {
        input: { type: mongoose.Schema.Types.Mixed, required: true },
        output: { type: mongoose.Schema.Types.Mixed, required: true },
        explanation: { type: String },
      },
    ],

    testCases: [
      {
        testCaseId: { type: String, required: true },
        input: { type: mongoose.Schema.Types.Mixed, required: true },
        output: { type: mongoose.Schema.Types.Mixed, required: true },
        points: { type: Number, default: 0 },
        isHidden: { type: Boolean, default: false },
      },
    ],

    // Shown in the editor — clean function signature only
    starterCode: {
      type: Map,
      of: String,
      required: true,
      default: () => new Map(),
    },

    // Hidden harness code wrapped around user code during execution
    runnerCode: {
      type: Map,
      of: String,
      required: true,
      default: () => new Map(),
    },

    constraints: { type: mongoose.Schema.Types.Mixed },
  },
  { timestamps: true },
);

const Problem =
  mongoose.models.Problem || mongoose.model("Problem", problemSchema);
export default Problem;
