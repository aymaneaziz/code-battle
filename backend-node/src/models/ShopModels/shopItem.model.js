import mongoose from "mongoose";
import { generateId } from "../../config/idGenerator.js";

const shopItemSchema = new mongoose.Schema(
  {
    shopItemId: {
      type: String,
      required: true,
      unique: true,
      default: () => generateId("shop"),
    },
    refId: { type: mongoose.Schema.Types.ObjectId, required: true },
    refType: {
      type: String,
      required: true,
      enum: ["PowerUp", "Avatar", "Badge"],
    },
    price: {
      coins: { type: Number, required: true },
      gems: { type: Number, required: true },
    },
  },
  { timestamps: true },
);

const ShopItem =
  mongoose.models.ShopItem || mongoose.model("ShopItem", shopItemSchema);
export default ShopItem;
