import { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { getSystemInfo } from "../controllers/HomePageControllers/getSystemInfo.controller.js";
import { getPlayerData } from "../controllers/HomePageControllers/getPlayerData.controller.js";

const homePageRouter = Router();
// GET api/home/data
homePageRouter.get("/data", getSystemInfo);
// GET api/home/player
homePageRouter.get("/player", protect, getPlayerData);

export default homePageRouter;
