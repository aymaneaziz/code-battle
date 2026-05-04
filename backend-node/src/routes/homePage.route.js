import { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { getSystemInfo } from "../controllers/HomePage/getSystemInfo.controller.js";
import { getPlayerData } from "../controllers/HomePage/getPlayerData.controller.js";

const homePage = Router();
// GET api/home/data
homePage.get("/data", getSystemInfo);
// GET api/home/player
homePage.get("/player", protect, getPlayerData);

export default homePage;
