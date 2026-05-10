import { addPowerUp } from "./addPowerUp.js";

export const addItem = (user, item) => {
  switch (item?.refType) {
    case "PowerUp": {
      user = addPowerUp(user, item);
      break;
    }
    case "Avatar": {
      user.unlockedAvatars.push(item.refId);
      break;
    }
    case "Badge": {
      user.badgesPlayer.push({
        badge: item.refId,
        earnedAt: new Date(),
      });
      break;
    }
  }
  return user;
};
