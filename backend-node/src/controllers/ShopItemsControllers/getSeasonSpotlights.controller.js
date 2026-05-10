import SeasonSpotlight from "../../models/ShopModels/seasonSpotlight.model.js";
import "../../models/ShopModels/shopItem.model.js";
import { getUserShopTracker } from "./Utils/getShopTracker.js";

export const getSeasonSpotlights = async (req, res) => {
  try {
    const now = new Date();
    let SeasonSpotlights = await SeasonSpotlight.find({
      startTime: { $lte: now },
      endTime: { $gte: now },
    }).populate({
      path: "shopItemId",
      populate: {
        path: "refId",
      },
    });
    if (SeasonSpotlights.length === 0) {
      SeasonSpotlights = await SeasonSpotlight.find({
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

    // update purchaseLimit + filtrage
    const updatedDeals = await Promise.all(
      SeasonSpotlights.map(async (item) => {
        const quantity = await getUserShopTracker(req, item);

        if (quantity) {
          item.purchaseLimit -= quantity;
        }

        return item;
      })
    );

    // ✅ enlever ceux dont purchaseLimit <= 0
    const deals = updatedDeals.filter((item) => item.purchaseLimit > 0);
    return res.status(200).json(deals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
