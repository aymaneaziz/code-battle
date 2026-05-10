import UserShopTracker from "../../../models/SystemModels/userShopTracker.model.js";
import User from "../../../models/user.model.js";

export const getUserShopTracker = async (req, data) => {
  try {
    const clerkId = req.auth.userId;
    const user = await User.findOne({ clerkId });

    if (!user) {
      throw new Error("User not found");
    }

    const tracker = await UserShopTracker.findOne({
      userId: user._id,
    });

    const item = tracker?.purchasedItems.find(
      (i) =>
        i.itemId.toString() === data._id.toString() && i.itemType === data.type
    );

    return item?.quantity || 0;
  } catch (error) {
    console.error("Shop Tracker Controller Error:", error);
    return null;
  }
};
