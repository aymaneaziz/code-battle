import mongoose from "mongoose";
import { generateId } from "../../config/idGenerator.js";

const missionSchema = new mongoose.Schema(
  {
    missionId: {
      type: String,
      required: true,
      unique: true,
      default: () => generateId("mission"),
    },

    mission: { type: String, required: true },
    iconUrl: { type: String, required: true },
    description: { type: String, required: true },
    type: {
      type: String,
      required: true,
      enum: [
        "DAILY_LOGIN",
        "WIN_MATCH",
        "PLAY_MATCH",
        "BUY_ITEM",
        "USE_POWERUP", // brite tzid hna chi haja zidha
      ],
    },
  },
  { timestamps: true }
);

const Mission =
  mongoose.models.Mission || mongoose.model("Mission", missionSchema);
export default Mission;
