import { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { getProfilePlayer } from "../controllers/ProfilePlayerControllers/getProfilePlayer.controller.js";
import putProfilePlayer from "../controllers/ProfilePlayerControllers/putProfilePlayer.controller.js";

const profilePlayerRouter = Router();
// GET api/data/profile
profilePlayerRouter.get("/profile", protect, getProfilePlayer);
// PUT api/data/profile
profilePlayerRouter.put("/profile", protect, putProfilePlayer);

export default profilePlayerRouter;
