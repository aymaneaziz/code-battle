import SeasonSpotlight from "../../models/ShopModels/seasonSpotlight.model.js";
import "../../models/ShopModels/shopItem.model.js";
import { getUserShopTracker } from "./Utils/getShopTracker.js";

export const getSeasonSpotlights = async (req, res) => {
  try {
    const now = new Date();
    const SeasonSpotlights = await SeasonSpotlight.find({
      startTime: { $lte: now },
      endTime: { $gte: now },
    }).populate({
      path: "shopItemId",
      populate: {
        path: "refId",
      },
    });
    if (SeasonSpotlights.length === 0) {
      var latest = await SeasonSpotlight.find({
        endTime: { $lt: now },
      })
        .sort({ endTime: -1 })
        .limit(4)
        .populate({
          path: "shopItemId",
          populate: {
            path: "refId",
          },
        });
    }

    // kan modifie l purchaseLimite
    const deals =
      SeasonSpotlights && SeasonSpotlights.length
        ? SeasonSpotlights
        : latest || [];
    for (const item of deals) {
      const quantity = await getUserShopTracker(
        req,
        item._id,
        "SeasonSpotlights",
        "seasonSpotlight"
      );
      if (quantity) {
        item.purchaseLimit -= quantity;
      }
    }

    return res.status(200).json(deals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
