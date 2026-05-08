import mongoose from "mongoose";
import { generateId } from "../../config/idGenerator.js";

const seasonSpotlightSchema = new mongoose.Schema(
  {
    seasonSpotlightId: {
      type: String,
      required: true,
      unique: true,
      default: () => generateId("seasonSpotlight"),
    },
    type: { type: String, default: "seasonSpotlight" },
    shopItemId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "ShopItem",
    },
    purchaseLimit: { type: Number, required: true, min: 1 },
    startTime: { type: Date, default: null },
    endTime: { type: Date, default: null },
  },
  { timestamps: true }
);

const SeasonSpotlight =
  mongoose.models.SeasonSpotlight ||
  mongoose.model("SeasonSpotlight", seasonSpotlightSchema);

export default SeasonSpotlight;
