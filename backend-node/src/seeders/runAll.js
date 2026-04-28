import connectToDatabase from "../database/mongodb.js";

import { seedAvatars } from "./PlyaerSetupData/avatar.seeder.js";
import { seedLanguages } from "./PlyaerSetupData/language.seeder.js";
import { seedBattlePreferences } from "./PlyaerSetupData/battlePreference.seeder.js";
import { seedCodingExperiences } from "./PlyaerSetupData/codingExperience.seeder.js";

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
