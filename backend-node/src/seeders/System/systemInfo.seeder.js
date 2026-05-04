import SystemInfo from "../../models/System/systemInfo.model.js";
import { seedData } from "../seederEngine.js";

const system = [
  {
    _id: "SYSTEM_CONFIG",
    currentSeason: 1,
    currentWeek: 1,
    activePlayers: 0,
    battlesToday: 0,
    liveMaches: 0,
    totalPlayers: 0,
    topPlayersThisWeek: [],
  },
];

export const seedSystemInfo = () => seedData(SystemInfo, system, "_id");
