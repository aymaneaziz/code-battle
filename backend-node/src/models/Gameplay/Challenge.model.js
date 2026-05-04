import mongoose from "mongoose";

const challengeSchema = new mongoose.Schema(
  {
    challengeId: { type: String, required: true, unique: true },
    problemId: { type: mongoose.Schema.Types.ObjectId, ref: "Problem" },
    xp: { type: Number, required: true },
    reward: { type: Object, required: true },
    solvedCount: { type: Number, default: 0 },
    acceptanceRate: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Challenge =
  mongoose.models.Challenge || mongoose.model("Challenge", challengeSchema);
export default Challenge;
