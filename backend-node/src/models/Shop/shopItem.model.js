import mongoose from "mongoose";

const shopItemSchema = new mongoose.Schema(
  {
    shopItemId: { type: String, required: true, unique: true },
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
  { timestamps: true }
);

const ShopItem =
  mongoose.models.ShopItem || mongoose.model("ShopItem", shopItemSchema);
export default ShopItem;
