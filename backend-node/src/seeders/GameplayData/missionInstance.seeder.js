import Mission from "../../models/GameplayModels/mission.model.js";
import MissionInstance from "../../models/GameplayModels/missionInstance.model.js";
import { seedData } from "../../config/seederEngine.js";

export const seedMissionInstance = async () => {
  const missions = await Mission.find();
  const missionMap = Object.fromEntries(
    missions.map((mission) => [mission.type, mission._id])
  );

  const now = new Date();

  const missionInstances = [
    // DAILY
    {
      missionInstanceId: "missionInstance_1",
      mission: missionMap.DAILY_LOGIN,
      category: "DAILY",
      target: 1,
      startTime: now,
      endTime: new Date(now.getTime() + 24 * 60 * 60 * 1000),
      rewardPrices: [{ rewardType: "Coins", amount: 50 }],
    },

    {
      missionInstanceId: "missionInstance_2",
      mission: missionMap.WIN_MATCH,
      category: "DAILY",
      target: 3,
      startTime: now,
      endTime: new Date(now.getTime() + 24 * 60 * 60 * 1000),
      rewardPrices: [
        { rewardType: "Coins", amount: 150 },
        { rewardType: "Xp", amount: 100 },
      ],
    },

    // WEEKLY
    {
      missionInstanceId: "missionInstance_3",
      mission: missionMap.PLAY_MATCH,
      category: "WEEKLY",
      target: 20,
      startTime: now,
      endTime: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000),
      rewardPrices: [{ rewardType: "Coins", amount: 500 }],
    },

    {
      missionInstanceId: "missionInstance_4",
      mission: missionMap.WIN_MATCH,
      category: "WEEKLY",
      target: 10,
      startTime: now,
      endTime: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000),
      rewardPrices: [
        { rewardType: "Coins", amount: 800 },
        { rewardType: "Gems", amount: 20 },
      ],
    },

    // SEASONAL
    {
      missionInstanceId: "missionInstance_5",
      mission: missionMap.WIN_MATCH,
      category: "SEASONAL",
      target: 100,
      startTime: now,
      endTime: new Date(now.getTime() + 150 * 24 * 60 * 60 * 1000),
      rewardPrices: [
        { rewardType: "Gems", amount: 200 },
        { rewardType: "Xp", amount: 1000 },
      ],
    },

    {
      missionInstanceId: "missionInstance_6",
      mission: missionMap.DAILY_LOGIN,
      category: "WEEKLY",
      target: 7,
      startTime: now,
      endTime: new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000),
      rewardPrices: [{ rewardType: "Coins", amount: 50 }],
    },
  ];

  await seedData(MissionInstance, missionInstances, "missionInstanceId");
};
