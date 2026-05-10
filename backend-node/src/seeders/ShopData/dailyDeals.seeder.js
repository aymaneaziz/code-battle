import { seedData } from "../../config/seederEngine.js";
import ShopItem from "../../models/ShopModels/shopItem.model.js";
import DailyDeal from "../../models/ShopModels/dailyDeal.model.js";

export const seedDailyDeals = async () => {
  const shopItems = await ShopItem.find().limit(2);

  const dailyDeals = [
    {
      dailyDealId: "dailyDeal1",
      shopItemId: shopItems[0]._id,
      discountPercentage: {
        coins: 50,
        gems: 0,
      },
      purchaseLimit: 3,
      startTime: new Date(2026, 4, 7),
      endTime: new Date(2026, 4, 11),
    },
    {
      dailyDealId: "dailyDeal2",
      shopItemId: shopItems[1]._id,
      discountPercentage: {
        coins: 50,
        gems: 50,
      },
      purchaseLimit: 3,
      startTime: new Date(2026, 4, 7),
      endTime: new Date(2026, 4, 11),
    },
  ];
  await seedData(DailyDeal, dailyDeals, "dailyDealId");
};
