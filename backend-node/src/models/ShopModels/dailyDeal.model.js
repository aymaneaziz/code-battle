import mongoose from "mongoose";
import { generateId } from "../../config/idGenerator.js";

const dailyDealSchema = new mongoose.Schema(
  {
    dailyDealId: {
      type: String,
      required: true,
      unique: true,
      default: () => generateId("dailyDeal"),
    },
    type: { type: String, default: "dailyDeal" },
    shopItemId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "ShopItem",
    },
    discountPercentage: {
      coins: { type: Number, required: true, min: 0, max: 100 },
      gems: { type: Number, required: true, min: 0, max: 100 },
    },
    purchaseLimit: { type: Number, required: true },
    startTime: { type: Date, required: true },
    endTime: { type: Date, required: true },
  },
  { timestamps: true }
);

const DailyDeal =
  mongoose.models.DailyDeal || mongoose.model("DailyDeals", dailyDealSchema);
export default DailyDeal;
