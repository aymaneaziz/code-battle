import ShopItem from "../../models/ShopModels/shopItem.model.js";
import "../../models/PlayerSetupModels/avatar.model.js";
import "../../models/ShopModels/powerUp.model.js";
import "../../models/PlayerInfoModels/badge.model.js";

export const getShopItems = async (req, res) => {
  try {
    const shopItems = await ShopItem.find().populate("refId");
    return res.status(200).json(shopItems);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
