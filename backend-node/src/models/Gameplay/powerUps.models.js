import mongoose from "mongoose";

const powerUpSchema = new mongoose.Schema(
  {
    powerUpId: { type: String, required: true, unique: true },
    label: { type: String, required: true, unique: true },
    icon: { type: String, required: true, unique: true },
    description: { type: String, required: true },
    type: { type: String, required: true },
    cooldownSec: { type: Number, required: true },
    maxUsesPerMatch: { type: Number, required: true },
    effect: { type: Object, required: true },
  },
  { timestamps: true }
);

const PowerUp =
  mongoose.models.PowerUp || mongoose.model("PowerUps", powerUpSchema);
export default PowerUp;
