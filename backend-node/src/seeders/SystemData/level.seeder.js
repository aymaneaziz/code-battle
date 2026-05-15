import Level from "../../models/SystemModels/level.model.js";
import { seedData } from "../../config/seederEngine.js";

const levels = [
  { levelId: "lvl1", levelNumber: 1, minXp: 0, maxXp: 100 },
  { levelId: "lvl2", levelNumber: 2, minXp: 101, maxXp: 300 },
  { levelId: "lvl3", levelNumber: 3, minXp: 301, maxXp: 600 },
  { levelId: "lvl4", levelNumber: 4, minXp: 601, maxXp: 1000 },
  { levelId: "lvl5", levelNumber: 5, minXp: 1001, maxXp: 1500 },
  { levelId: "lvl6", levelNumber: 6, minXp: 1501, maxXp: 2100 },
  { levelId: "lvl7", levelNumber: 7, minXp: 2101, maxXp: 2800 },
  { levelId: "lvl8", levelNumber: 8, minXp: 2801, maxXp: 3600 },
  { levelId: "lvl9", levelNumber: 9, minXp: 3601, maxXp: 4500 },
  { levelId: "lvl10", levelNumber: 10, minXp: 4501, maxXp: 5500 },
  { levelId: "lvl11", levelNumber: 11, minXp: 5501, maxXp: 6600 },
  { levelId: "lvl12", levelNumber: 12, minXp: 6601, maxXp: 7800 },
  { levelId: "lvl13", levelNumber: 13, minXp: 7801, maxXp: 9100 },
  { levelId: "lvl14", levelNumber: 14, minXp: 9101, maxXp: 10500 },
  { levelId: "lvl15", levelNumber: 15, minXp: 10501, maxXp: 12000 },
];
export const seedLevel = () => seedData(Level, levels, "levelId");
