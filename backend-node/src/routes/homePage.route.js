import { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { getPlayerInfo } from "../controllers/HomePageControllers/getPlayerInfo.controller.js";

const homePageRouter = Router();

// GET api/home/player
homePageRouter.get("/player", protect, getPlayerInfo);

export default homePageRouter;
