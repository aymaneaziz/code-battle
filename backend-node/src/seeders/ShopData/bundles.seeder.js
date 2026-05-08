import Bundle from "../../models/ShopModels/bundle.model.js";
import ShopItem from "../../models/ShopModels/shopItem.model.js";
import Avatar from "../../models/PlayerSetupModels/avatar.model.js";
import { seedData } from "../../config/seederEngine.js";

export const seedBundles = async () => {
  const items = await ShopItem.find();
  const avatar1 = await Avatar.findOne({
    avatarId: "avatar4",
  });
  const avatar2 = await Avatar.findOne({
    avatarId: "avatar5",
  });
  const bundles = [
    {
      bundleId: "bundle1",
      name: "Starter Pack",
      description: "Best pack to start your journey",
      icon: "🎁",
      items: [
        { refId: items[3]._id, refType: "PowerUp", quantity: 3 },
        { refId: items[4]._id, refType: "PowerUp", quantity: 3 },
        { refId: avatar1._id, refType: "Avatar", quantity: 1 },
      ],
      price: { coins: 200, gems: 5 },
      purchaseLimit: 1,
    },
    {
      bundleId: "bundle2",
      name: "Value Pack",
      description: "Great for regular play, more power-ups and a cosmetic",
      icon: "💎",
      items: [
        { refId: items[2]._id, refType: "PowerUp", quantity: 3 },
        { refId: items[3]._id, refType: "PowerUp", quantity: 3 },
        { refId: items[4]._id, refType: "PowerUp", quantity: 3 },
        { refId: avatar2._id, refType: "Avatar", quantity: 1 },
      ],
      price: { coins: 500, gems: 10 },
      purchaseLimit: 3,
      startTime: new Date(2026, 4, 7),
      endTime: new Date(2026, 5, 7),
    },
  ];
  await seedData(Bundle, bundles, "bundleId");
};
