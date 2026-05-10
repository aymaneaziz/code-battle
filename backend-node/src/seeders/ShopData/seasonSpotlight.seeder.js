import { seedData } from "../../config/seederEngine.js";
import ShopItem from "../../models/ShopModels/shopItem.model.js";
import SeasonSpotlight from "../../models/ShopModels/seasonSpotlight.model.js";

export const seedSeasonSpotlight = async () => {
  const shopItems = await ShopItem.find({ refType: "PowerUp" });

  const SeasonSpotlights = [
    {
      seasonSpotlightId: "seasonSpotlight1",
      shopItemId: shopItems[0]._id,
      purchaseLimit: 20,
      startTime: new Date(2026, 4, 1),
      endTime: new Date(2026, 10, 1),
    },
    {
      seasonSpotlightId: "seasonSpotlight2",
      shopItemId: shopItems[1]._id,
      purchaseLimit: 20,
      startTime: new Date(2026, 4, 1),
      endTime: new Date(2026, 10, 1),
    },

    {
      seasonSpotlightId: "seasonSpotlight3",
      shopItemId: shopItems[2]._id,
      purchaseLimit: 20,
      startTime: new Date(2026, 4, 1),
      endTime: new Date(2026, 10, 1),
    },
    {
      seasonSpotlightId: "seasonSpotlight4",
      shopItemId: shopItems[3]._id,
      purchaseLimit: 20,
      startTime: new Date(2026, 4, 1),
      endTime: new Date(2026, 10, 1),
    },
    {
      seasonSpotlightId: "seasonSpotlight5",
      shopItemId: shopItems[4]._id,
      purchaseLimit: 20,
      startTime: new Date(2026, 4, 1),
      endTime: new Date(2026, 10, 1),
    },
  ];
  await seedData(SeasonSpotlight, SeasonSpotlights, "seasonSpotlightId");
};
