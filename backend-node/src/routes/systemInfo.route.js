import { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { getSystemInfo } from "../controllers/SystemeControllers/getSystemInfo.controller.js";
import { getSeasonEndDate } from "../controllers/SystemeControllers/getSeasonEndDate.controller.js";
import { getWeeklyEndDate } from "../controllers/SystemeControllers/getWeeklyEndDate.controller.js";

const systemInfoRouter = Router();

// GET api/system/data
systemInfoRouter.get("/data", getSystemInfo);

// GET /api/system/seasonEndDate
systemInfoRouter.get("/seasonEndDate", protect, getSeasonEndDate);

// GET /api/system/weeklyEndDate
systemInfoRouter.get("/weeklyEndDate", protect, getWeeklyEndDate);

export default systemInfoRouter;
