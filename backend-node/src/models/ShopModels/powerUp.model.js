import mongoose from "mongoose";
import { generateId } from "../../config/idGenerator.js";

const powerUpSchema = new mongoose.Schema(
  {
    powerUpId: {
      type: String,
      required: true,
      unique: true,
      default: () => generateId("powerUp"),
    },
    label: { type: String, required: true, unique: true },
    iconUrl: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    type: { type: String, required: true },
    cooldownSec: { type: Number, required: true },
    maxUsesPerMatch: { type: Number, required: true },
    effect: { type: Object, required: true },
  },
  { timestamps: true }
);

const PowerUp =
  mongoose.models.PowerUp || mongoose.model("PowerUp", powerUpSchema);
export default PowerUp;
