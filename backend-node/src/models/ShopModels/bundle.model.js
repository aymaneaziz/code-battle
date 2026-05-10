import mongoose from "mongoose";
import { generateId } from "../../config/idGenerator.js";

const bundleSchema = new mongoose.Schema(
  {
    bundleId: {
      type: String,
      required: true,
      unique: true,
      default: () => generateId("bundle"),
    },
    name: { type: String, required: true },
    description: { type: String, required: true },
    type: { type: String, default: "bundle" },
    iconUrl: { type: String, required: true },
    items: [
      {
        refId: {
          type: mongoose.Schema.Types.ObjectId,
          required: true,
          ref: "ShopItem",
        },
        quantity: { type: Number, required: true },
      },
    ],
    price: {
      coins: { type: Number, required: true },
      gems: { type: Number, required: true },
    },
    purchaseLimit: { type: Number, required: true },
    startTime: { type: Date, default: null },
    endTime: { type: Date, default: null },
  },
  { timestamps: true }
);

const Bundle = mongoose.models.Bundle || mongoose.model("Bundle", bundleSchema);
export default Bundle;
