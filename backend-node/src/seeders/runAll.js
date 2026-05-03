import connectToDatabase from "../database/mongodb.js";

import { seedAvatars } from "./PlayerSetupData/avatar.seeder.js";
import { seedLanguages } from "./PlayerSetupData/language.seeder.js";
import { seedBattlePreferences } from "./PlayerSetupData/battlePreference.seeder.js";
import { seedCodingExperiences } from "./PlayerSetupData/codingExperience.seeder.js";
import { seedBadges } from "./PlayerInfoData/badge.seeder.js";
import { seedSystemInfo } from "./System/systemInfo.seeder.js";
import { seedRank } from "./System/rank.seeder.js";

const runSeeders = async () => {
  try {
    await connectToDatabase();
    console.log("Connected to Database for seeding...");

    // Execute all seeders Using Promise.all makes it scalable and fast.
    await Promise.all([
      seedAvatars(),
      seedLanguages(),
      seedBattlePreferences(),
      seedCodingExperiences(),
      seedBadges(),
      seedSystemInfo(),
      seedRank(),

      // zid hna seed function
    ]);

    console.log("All  seed data has been synchronized!");
    process.exit(0);
  } catch (error) {
    console.error("Seeding process failed:", error);
    process.exit(1);
  }
};
runSeeders();
// hahiya al m3gaz ga3 mt3dbch  : npm run db:seed
