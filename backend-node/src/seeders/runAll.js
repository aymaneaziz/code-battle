import connectToDatabase from "../database/mongodb.js";

import { seedAvatars } from "./PlayerSetupData/avatar.seeder.js";
import { seedLanguages } from "./PlayerSetupData/language.seeder.js";
import { seedBattlePreferences } from "./PlayerSetupData/battlePreference.seeder.js";
import { seedCodingExperiences } from "./PlayerSetupData/codingExperience.seeder.js";
import { seedBadges } from "./PlayerInfoData/badge.seeder.js";
import { seedSystem } from "./SystemData/system.seeder.js";
import { seedRank } from "./SystemData/rank.seeder.js";
import { seedProblems } from "./Gameplay/problem.seeder.js";
import { seedChallenges } from "./Gameplay/challenge.seeder.js";

const runSeeders = async () => {
  try {
    await connectToDatabase();
    console.log("Connected to Database for seeding...");

    // Execute all seeders Using Promise.all makes it scalable and fast.
    await Promise.all([
      await seedProblems(), //5ass dima problemes t executa lawla bach challenge seed t5dm
      seedAvatars(),
      seedLanguages(),
      seedBattlePreferences(),
      seedCodingExperiences(),
      seedBadges(),
      seedSystem(),
      seedRank(),
      seedChallenges(),

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
