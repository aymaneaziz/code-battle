import mongoose from "mongoose";

const userProgressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    solvedChallenges: [
      { type: mongoose.Schema.Types.ObjectId, ref: "Challenge" },
    ],
    status: {
      type: String,
      enum: ["unsolved", "attempted", "solved"],
      default: "unsolved",
    },
    completedAt: {
      type: Date,
    },
  },
  { timestamps: true }
);

// This index ensures a user has only one progress record total
userProgressSchema.index({ userId: 1 }, { unique: true });

const UserProgress =
  mongoose.models.UserProgress ||
  mongoose.model("UserProgress", userProgressSchema);
export default UserProgress;
