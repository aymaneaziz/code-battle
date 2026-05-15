import mongoose from "mongoose";

const userMissionProgressSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    missionInstanceId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "MissionInstance",
      required: true,
    },

    category: {
      type: String,
      enum: ["DAILY", "WEEKLY", "SEASONAL"],
      required: true,
    },

    progress: { type: Number, default: 0 },
    isCompleted: { type: Boolean, default: false },
    isClaimed: { type: Boolean, default: false },

    completedAt: Date,
    claimedAt: Date,
    lastUpdateDate: Date,
  },
  { timestamps: true }
);
// This index ensures a user has only one progress record total
userMissionProgressSchema.index(
  {
    userId: 1,
    missionInstanceId: 1,
  },
  { unique: true }
);

const UserMissionProgress =
  mongoose.models.UserMissionProgress ||
  mongoose.model("UserMissionProgress", userMissionProgressSchema);
export default UserMissionProgress;
