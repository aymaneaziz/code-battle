import UserShopTracker from "../../../models/SystemModels/userShopTracker.model.js";
import User from "../../../models/user.model.js";

export const getUserShopTracker = async (req, id, model, item) => {
  try {
    const clerkId = req.auth.userId;
    const user = await User.findOne({ clerkId });

    if (!user) {
      throw new Error("User not found");
    }

    const data = await UserShopTracker.findOne({
      ["purchased" + model + "." + item]: id,
    }).select("quantity");
    return data;
  } catch (error) {
    console.error("Shop Tracker Controller Error:", error);
    return null;
  }
};
