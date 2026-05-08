import User from "../../models/user.model.js";
import { addPowerUp } from "./Utils/addPowerUp.js";

export const putPurchasedItems = async (req, res) => {
  try {
    const clerkId = req.auth.userId;
    let user = await User.findOne({ clerkId });

    const data = req.body;

    if (data.type === "bundle") {
      console.log(data);

      return res.status(200).json({
        message: "done!!",
      });
    }

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
    user.stats.coins -= priceCoins;
    user.stats.gems -= priceGems;

    // =========================
    // POWER UP
    // =========================
    if (item?.refType === "PowerUp") {
      user = addPowerUp(user, item);
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
