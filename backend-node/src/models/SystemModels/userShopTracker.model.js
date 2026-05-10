import mongoose from "mongoose";

const userShopTrackerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    purchasedItems: [
      {
        itemId: mongoose.Schema.Types.ObjectId,
        itemType: {
          type: String,
          enum: ["dailyDeal", "seasonSpotlight", "bundle"],
        },
        quantity: { type: Number, default: 1 },
      },
    ],
  },
  { timestamps: true }
);

// This index ensures a user has only one progress record total
userShopTrackerSchema.index({ userId: 1 }, { unique: true });

const UserShopTracker =
  mongoose.models.UserShopTracker ||
  mongoose.model("UserShopTracker", userShopTrackerSchema);
export default UserShopTracker;
