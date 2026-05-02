import { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { getProfilePlayer } from "../controllers/getProfilePlayer.controller.js";
import putProfilePlayer from "../controllers/putProfilePlayer.controller.js";

const profilePlayer = Router();
// GET api/data/profile
profilePlayer.get("/profile", protect, getProfilePlayer);
// PUT api/data/profile
profilePlayer.put("/profile", protect, putProfilePlayer);

export default profilePlayer;
