import mongoose from "mongoose";

const userProgressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    challengeProgress: [
      {
        challengeId: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Challenge",
          required: true,
        },
        solved: { type: Boolean, default: false },
        rewardClaimed: { type: Boolean, default: false },
        solvedAt: { type: Date },
        rewardClaimedAt: { type: Date },
      },
    ],
  },
  { timestamps: true },
);
// Fast lookup: "does this user have an entry for challenge X?"
userProgressSchema.index({ userId: 1, "challengeProgress.challengeId": 1 });

const UserProgress =
  mongoose.models.UserProgress ||
  mongoose.model("UserProgress", userProgressSchema);
export default UserProgress;
