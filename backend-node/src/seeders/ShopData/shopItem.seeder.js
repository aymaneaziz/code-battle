import PowerUp from "../../models/ShopModels/powerUp.model.js";
import ShopItem from "../../models/ShopModels/shopItem.model.js";
import { seedData } from "../../config/seederEngine.js";

export const seedShopItems = async () => {
  const powerUps = await PowerUp.find();
  const shopItems = [
    {
      shopItemId: "ShopItem1",
      refId: powerUps[0]._id,
      refType: "PowerUp",
      price: {
        coins: 20,
        gems: 1,
      },
    },
    {
      shopItemId: "ShopItem2",
      refId: powerUps[1]._id,
      refType: "PowerUp",
      price: {
        coins: 40,
        gems: 2,
      },
    },
    {
      shopItemId: "ShopItem3",
      refId: powerUps[2]._id,
      refType: "PowerUp",
      price: {
        coins: 50,
        gems: 2,
      },
    },
    {
      shopItemId: "ShopItem4",
      refId: powerUps[3]._id,
      refType: "PowerUp",
      price: {
        coins: 60,
        gems: 3,
      },
    },
    {
      shopItemId: "ShopItem5",
      refId: powerUps[4]._id,
      refType: "PowerUp",
      price: {
        coins: 30,
        gems: 1,
      },
    },
  ];
  await seedData(ShopItem, shopItems, "shopItemId");
};
