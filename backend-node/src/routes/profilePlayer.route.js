import { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { getProfilePlayer } from "../controllers/ProfilePlayerControllers/getProfilePlayer.controller.js";
import putProfilePlayer from "../controllers/ProfilePlayerControllers/putProfilePlayer.controller.js";
import { getMatchHistory } from "../controllers/ProfilePlayerControllers/getMatchHistory.controller.js";

const profilePlayerRouter = Router();
// GET api/data/profile
profilePlayerRouter.get("/profile", protect, getProfilePlayer);

// ── GET /api/data/profile/match-history
profilePlayerRouter.get("/profile/match-history", protect, getMatchHistory);
// PUT api/data/profile
profilePlayerRouter.put("/profile", protect, putProfilePlayer);

export default profilePlayerRouter;
