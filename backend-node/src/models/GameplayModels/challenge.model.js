import mongoose from "mongoose";
import { generateId } from "../../config/idGenerator.js";

const challengeSchema = new mongoose.Schema(
  {
    challengeId: {
      type: String,
      required: true,
      unique: true,
      default: () => generateId("challenge"),
    },
    problemId: { type: mongoose.Schema.Types.ObjectId, ref: "Problem" },
    xp: { type: Number, required: true },

    reward: { type: Object, required: true },
    solvedCount: { type: Number, default: 0 },
    acceptanceRate: { type: Number, default: 0 },

    // hadi ghir bach n9dro nrdoha daily ila bghina
    isDaily: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);
// Index for performance when searching for daily challenges
challengeSchema.index({ isDaily: 1 });

const Challenge =
  mongoose.models.Challenge || mongoose.model("Challenge", challengeSchema);
export default Challenge;
