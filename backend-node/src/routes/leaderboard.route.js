import { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { getGlobalRank } from "../controllers/LeaderboardControllers/getGlobalRank.controller.js";
import { getMyGlobalRank } from "../controllers/LeaderboardControllers/getMyGlobalRank.controller.js";

const leaderboardRouter = Router();

// GET api/leaderboard/data
leaderboardRouter.get("/data", getGlobalRank);

// GET api/leaderboard/data/:limit
leaderboardRouter.get("/data/:limit", getGlobalRank);

// GET api/leaderboard/myrank
leaderboardRouter.get("/myrank", protect, getMyGlobalRank);

export default leaderboardRouter;
