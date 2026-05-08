import Bundle from "../../models/ShopModels/bundle.model.js";
import "../../models/ShopModels/powerUp.model.js";
import "../../models/PlayerSetupModels/avatar.model.js";
import "../../models/PlayerInfoModels/badge.model.js";

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
    });

    // fallback si aucun bundle actif
    if (bundles.length === 0) {
      const backup = await Bundle.find().populate({
        path: "items.refId",
      });

      return res.status(200).json(backup);
    }

    return res.status(200).json(bundles);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
