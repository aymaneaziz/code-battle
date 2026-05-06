import mongoose from "mongoose";
import { generateId } from "../../config/idGenerator.js";

const badgeSchema = new mongoose.Schema(
  {
    badgeId: {
      type: String,
      required: true,
      unique: true,
      default: () => generateId("badge"),
    },
    name: { type: String, required: true },
    description: { type: String, required: true },
    iconUrl: { type: String, required: true },
    rarity: {
      type: String,
      enum: ["Common", "Rare", "Epic", "Legendary"],
      default: "Common",
    },
  },
  { timestamps: true },
);

const Badge = mongoose.models.Badge || mongoose.model("Badge", badgeSchema);
export default Badge;
