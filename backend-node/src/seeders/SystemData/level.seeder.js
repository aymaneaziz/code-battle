import Level from "../../models/SystemModels/level.model.js";
import { seedData } from "../../config/seederEngine.js";

const levels = [
  { levelId: "lvl1", levelNumber: 1, minXp: 0, maxXp: 500 },
  { levelId: "lvl2", levelNumber: 2, minXp: 500, maxXp: 1400 },
  { levelId: "lvl3", levelNumber: 3, minXp: 1400, maxXp: 3020 },
  { levelId: "lvl4", levelNumber: 4, minXp: 3020, maxXp: 5936 },
  { levelId: "lvl5", levelNumber: 5, minXp: 5936, maxXp: 11185 },
  { levelId: "lvl6", levelNumber: 6, minXp: 11185, maxXp: 20633 },
  { levelId: "lvl7", levelNumber: 7, minXp: 20633, maxXp: 37639 },
  { levelId: "lvl8", levelNumber: 8, minXp: 37639, maxXp: 68250 },
  { levelId: "lvl9", levelNumber: 9, minXp: 68250, maxXp: 123349 },
  { levelId: "lvl10", levelNumber: 10, minXp: 123349, maxXp: 222527 },
  { levelId: "lvl11", levelNumber: 11, minXp: 222527, maxXp: 401047 },
  { levelId: "lvl12", levelNumber: 12, minXp: 401047, maxXp: 722383 },
  { levelId: "lvl13", levelNumber: 13, minXp: 722383, maxXp: 1300788 },
  { levelId: "lvl14", levelNumber: 14, minXp: 1300788, maxXp: 2341918 },
  { levelId: "lvl15", levelNumber: 15, minXp: 2341918, maxXp: 4215952 },
];
export const seedLevel = () => seedData(Level, levels, "levelId");
