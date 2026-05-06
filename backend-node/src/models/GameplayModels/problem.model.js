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
    tags: { type: [String], required: true },
    returnType: { type: String, required: true },
    functionName: { type: String, required: true },

    difficulty: {
      type: String,
      enum: ["EASY", "MEDIUM", "HARD", "EXTREME"],
      default: "EASY",
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

    starterCode: {
      python: { type: String, required: true },
      javascript: { type: String, required: true },
    },

    constraints: { type: mongoose.Schema.Types.Mixed },
  },
  { timestamps: true },
);

const Problem =
  mongoose.models.Problem || mongoose.model("Problem", problemSchema);
export default Problem;
