import connectToDatabase from "../database/mongodb.js";

import "../models/GameplayModels/problem.model.js";
import "../models/PlayerSetupModels/avatar.model.js";

import { seedAvatars } from "./PlayerSetupData/avatar.seeder.js";
import { seedLanguages } from "./PlayerSetupData/language.seeder.js";
import { seedBattlePreferences } from "./PlayerSetupData/battlePreference.seeder.js";
import { seedCodingExperiences } from "./PlayerSetupData/codingExperience.seeder.js";

import { seedBadges } from "./PlayerInfoData/badge.seeder.js";

import { seedSystem } from "./SystemData/system.seeder.js";
import { seedRank } from "./SystemData/rank.seeder.js";

import { seedProblems } from "./GameplayData/problem.seeder.js";
import { seedChallenges } from "./GameplayData/challenge.seeder.js";

import { seedPowerUp } from "./ShopData/powerUps.seeder.js";
import { seedShopItems } from "./ShopData/shopItem.seeder.js";

const runSeeders = async () => {
  try {
    await connectToDatabase();
    console.log("Connected to Database for seeding...");

    // Execute all seeders Using Promise.all makes it scalable and fast.
    await Promise.all([
      seedPowerUp(),
      seedProblems(),
      seedShopItems(),
      seedAvatars(), // had awit dartli mochkil 7it  Promise.all katakhod array dyl promises, machi awaited values.
      seedLanguages(),
      seedBattlePreferences(),
      seedCodingExperiences(),
      seedBadges(),
      seedSystem(),
      seedRank(),

      // zid hna seed function
    ]);
    // Seed dependent data last (ex Challenges need Problems to exist)
    console.log("Seeding challenges...");
    await seedChallenges();

    console.log("✅ All seed data has been synchronized!");
    process.exit(0);
  } catch (error) {
    console.error("❌ Seeding process failed:", error);
    process.exit(1);
  }
};
runSeeders();
// hahiya al m3gaz ga3 mt3dbch  : npm run db:seed
