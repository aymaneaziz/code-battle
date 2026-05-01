import { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { getProfilePlayer } from "../controllers/getProfilePlayer.controller.js";

const profilePlayer = Router();
// GET api/data/profile
profilePlayer.get("/profile", protect, getProfilePlayer);

export default profilePlayer;
