import cron from "node-cron";
import { globalRank } from "./services/leaderboard.service.js";

export const initLeaderboardJob = async () => {
  // 1️⃣ RUN IMMEDIATELY ON START
  console.log("🚀 Initial leaderboard calculation...");
  try {
    await globalRank();
    console.log("✅ Initial leaderboard done");
  } catch (err) {
    console.error("❌ Initial leaderboard failed:", err.message);
  }

  // 2️⃣ RUN EVERY 15 MINUTES
  cron.schedule("*/15 * * * *", async () => {
    console.log("⏳ Updating global leaderboard...");

    try {
      await globalRank();
      console.log("✅ Leaderboard updated");
    } catch (err) {
      console.error("❌ Leaderboard update failed:", err.message);
    }
  });
};
