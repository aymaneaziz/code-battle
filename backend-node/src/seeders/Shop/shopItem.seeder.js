import { seedData } from "../seederEngine.js";
import PowerUp from "../../models/Gameplay/powerUps.models.js";
import ShopItem from "../../models/Shop/shopItem.model.js";

export const seedShopItems = async () => {
  const powerUps = await PowerUp.find();
  const shopItems = [
    {
      shopItemId: "SI1",
      refId: powerUps[0]._id,
      type: "powerUp",
      price: {
        coins: 20,
        gems: 1,
      },
    },
    {
      shopItemId: "SI2",
      refId: powerUps[1]._id,
      type: "powerUp",
      price: {
        coins: 40,
        gems: 2,
      },
    },
    {
      shopItemId: "SI3",
      refId: powerUps[2]._id,
      type: "powerUp",
      price: {
        coins: 50,
        gems: 2,
      },
    },
    {
      shopItemId: "SI4",
      refId: powerUps[3]._id,
      type: "powerUp",
      price: {
        coins: 60,
        gems: 3,
      },
    },
    {
      shopItemId: "SI5",
      refId: powerUps[4]._id,
      type: "powerUp",
      price: {
        coins: 30,
        gems: 1,
      },
    },
  ];
  seedData(ShopItem, shopItems, "shopItemId");
};
