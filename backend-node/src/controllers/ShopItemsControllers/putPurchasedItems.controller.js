import User from "../../models/user.model.js";
import { addItem } from "./Utils/addItem.js";
import UserShopTracker from "../../models/SystemModels/userShopTracker.model.js";

export const putPurchasedItems = async (req, res) => {
  try {
    const clerkId = req.auth.userId;
    let user = await User.findOne({ clerkId });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const data = req.body;

    const item = data.shopItemId;

    const userCoins = user?.stats?.coins || 0;
    const userGems = user?.stats?.gems || 0;

    const discountCoins = data?.discountPercentage?.coins || 0;
    const discountGems = data?.discountPercentage?.gems || 0;

    const priceCoins = item?.price?.coins || 0;
    const priceGems = item?.price?.gems || 0;

    const finalPriceCoins = Math.max(
      0,
      priceCoins - (discountCoins * priceCoins) / 100
    );

    const finalPriceGems = Math.max(
      0,
      priceGems - (discountGems * priceGems) / 100
    );

    // vérifier si le joueur possède assez d'argent
    if (userCoins < finalPriceCoins || userGems < finalPriceGems) {
      return res.status(400).json({
        message: "Not enough money",
      });
    }

    // retirer les coins/gems
    user.stats.coins -= finalPriceCoins;
    user.stats.gems -= finalPriceGems;

    user = addItem(user, item);

    // if he purchased a bundle
    if (data.type === "bundle") {
      if (userCoins < data?.price?.coins || userGems < data?.price?.gems) {
        return res.status(400).json({
          message: "Not enough money",
        });
      }
      data.items.map((item) => {
        user = addItem(user, item.refId);
      });
    }

    const updated = await UserShopTracker.findOneAndUpdate(
      {
        userId: user._id,
        purchasedItems: {
          $elemMatch: {
            // kay9lb 3la hadak element bdbt
            itemId: data._id,
            itemType: data.type,
          },
        },
      },
      {
        $inc: {
          "purchasedItems.$.quantity": 1,
        },
      },
      { returnDocument: "after" }
    );

    if (!updated) {
      await UserShopTracker.findOneAndUpdate(
        { userId: user._id },
        {
          $push: {
            purchasedItems: {
              itemId: data._id,
              itemType: data.type,
              quantity: 1,
            },
          },
        },
        {
          upsert: true,
          returnDocument: "after",
        }
      );
    }
    await user.save();

    return res.status(200).json({
      message: "Purchase successful",
      user,
    });
  } catch (error) {
    console.log(error);

    return res.status(500).json({
      message: "Server error",
    });
  }
};
