import mongoose from "mongoose";

const userShopTrackerSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    purchasedDailyDeals: [
      {
        dailyDeal: { type: mongoose.Schema.Types.ObjectId, ref: "DailyDeal" },
        quantity: { type: Number, default: 0 },
      },
    ],
    purchasedSeasonSpotlights: [
      {
        seasonSpotlight: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "SeasonSpotlight",
        },
        quantity: { type: Number, default: 0 },
      },
    ],
    purchasedBundles: [
      {
        bundle: { type: mongoose.Schema.Types.ObjectId, ref: "Bundle" },
        quantity: { type: Number, default: 0 },
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
