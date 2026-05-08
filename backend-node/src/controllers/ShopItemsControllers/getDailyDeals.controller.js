import DailyDeal from "../../models/ShopModels/dailyDeal.model.js";
import "../../models/ShopModels/shopItem.model.js";

export const getDailyDeals = async (req, res) => {
  try {
    const now = new Date();
    const dailyDeals = await DailyDeal.find({
      startTime: { $lte: now },
      endTime: { $gte: now },
    }).populate({
      path: "shopItemId",
      populate: {
        path: "refId",
      },
    });

    if (dailyDeals.length === 0) {
      const latest = await DailyDeal.find({
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
      return res.status(200).json(latest);
    }
    return res.status(200).json(dailyDeals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
