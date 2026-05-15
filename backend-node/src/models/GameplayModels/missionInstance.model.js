import mongoose from "mongoose";
import { generateId } from "../../config/idGenerator.js";

const missionInstanceSchema = new mongoose.Schema(
  {
    missionInstanceId: {
      type: String,
      required: true,
      unique: true,
      default: () => generateId("missionInstance"),
    },

    category: {
      type: String,
      enum: ["DAILY", "WEEKLY", "SEASONAL"],
      required: true,
    },

    mission: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Mission",
      required: true,
    },

    target: {
      type: Number,
      required: true,
    },

    rewardItems: [
      {
        rewardItemId: {
          type: mongoose.Schema.Types.ObjectId,
          refPath: "rewardItems.rewardType",
        },
        rewardType: {
          type: String,
          enum: ["PowerUp", "Avatar", "Badge"],
        },
        amount: {
          type: Number,
          required: true,
        },
      },
    ],

    rewardPrices: [
      {
        rewardType: {
          type: String,
          enum: ["Coins", "Gems", "Xp"],
        },
        amount: {
          type: Number,
          required: true,
        },
      },
    ],

    isActive: { type: Boolean, default: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
  },
  { timestamps: true }
);

const MissionInstance =
  mongoose.models.MissionInstance ||
  mongoose.model("MissionInstance", missionInstanceSchema);
export default MissionInstance;
