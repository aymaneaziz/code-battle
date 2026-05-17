import Mission from "../../models/GameplayModels/mission.model.js";
import { seedData } from "../../config/seederEngine.js";

const missions = [
  {
    missionId: "mission_1",
    mission: "Daily Visitor",
    description: "Login to the game",
    type: "DAILY_LOGIN",
    iconUrl: "📅",
  },

  {
    missionId: "mission_2",
    mission: "Winning Streak",
    description: "Win multiple matches",
    type: "WIN_MATCH",
    iconUrl: "🔥",
  },

  {
    missionId: "mission_3",
    mission: "Collector",
    description: "Buy an item from the shop",
    type: "BUY_ITEM",
    iconUrl: "🛒",
  },

  {
    missionId: "mission_4",
    mission: "Power User",
    description: "Use a power up",
    type: "USE_POWERUP",
    iconUrl: "⚡",
  },

  {
    missionId: "mission_5",
    mission: "Regular Gamer",
    description: "Play several matches",
    type: "PLAY_MATCH",
    iconUrl: "🕹️",
  },
];

export const seedMissions = () => seedData(Mission, missions, "missionId");
