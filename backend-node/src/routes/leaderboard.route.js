import { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { getGlobalRank } from "../controllers/LeaderboardControllers/getGlobalRank.controller.js";
import { getMyGlobalRank } from "../controllers/LeaderboardControllers/getMyGlobalRank.controller.js";

const leaderboardRouter = Router();

// GET api/leatherboard/data
leaderboardRouter.get("/data", getGlobalRank);

// GET api/leatherboard/myrank
leaderboardRouter.get("/myrank", protect, getMyGlobalRank);

export default leaderboardRouter;
