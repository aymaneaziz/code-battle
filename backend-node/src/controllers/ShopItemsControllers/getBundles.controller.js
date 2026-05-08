import Bundle from "../../models/ShopModels/bundle.model.js";

import "../../models/ShopModels/powerUp.model.js";
import "../../models/PlayerSetupModels/avatar.model.js";
import "../../models/PlayerInfoModels/badge.model.js";

import { getUserShopTracker } from "./Utils/getShopTracker.js";

export const getBundles = async (req, res) => {
  try {
    const now = new Date();
    const bundles = await Bundle.find({
      $and: [
        {
          $or: [{ startTime: null }, { startTime: { $lte: now } }],
        },
        {
          $or: [{ endTime: null }, { endTime: { $gte: now } }],
        },
      ],
    }).populate({
      path: "items.refId",
      populate: {
        path: "refId",
      },
    });

    // fallback si aucun bundle actif
    if (bundles.length === 0) {
      var backup = await Bundle.find().populate({
        path: "items.refId",
        populate: {
          path: "refId",
        },
      });
    }

    // kan modifie l purchaseLimite
    const deals = bundles && bundles.length ? bundles : backup || [];
    for (const item of deals) {
      const quantity = await getUserShopTracker(
        req,
        item._id,
        "Bundles",
        "bundle"
      );
      if (quantity) {
        item.purchaseLimit -= quantity;
      }
    }
    return res.status(200).json(deals);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
