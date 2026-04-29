import mongoose from "mongoose";

const badgeSchema = new mongoose.Schema(
  {
    badgeId: { type: String, required: true, unique: true },
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

const Badge = mongoose.model("Badge", badgeSchema);
export default Badge;
