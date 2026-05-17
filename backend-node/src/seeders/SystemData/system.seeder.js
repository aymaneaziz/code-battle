import System from "../../models/SystemModels/system.model.js";
import { seedData } from "../../config/seederEngine.js";
export const seedSystem = () => {
  const system = [
    {
      _id: "SYSTEM_CONFIG",
      currentSeason: 1,
      currentWeek: 4,
      activePlayers: 0,
      totalPlayers: 0,
      battlesToday: 0,
      liveMatches: 0,
      topPlayersThisWeek: [],
      weeklyEndDate: new Date(2026, 4, 25),
      seasonStartDate: new Date(2026, 4, 1), // May 1 2026
      seasonEndDate: new Date(2026, 10, 1), // November 1 2026
    },
  ];

  seedData(System, system, "_id");
};
