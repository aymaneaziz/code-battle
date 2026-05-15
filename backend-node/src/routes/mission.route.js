import { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { getMission } from "../controllers/MissionsControllers/getMissions.controller.js";
import { getProgress } from "../controllers/MissionsControllers/getProgress.controller.js";
import { putProgress } from "../controllers/MissionsControllers/putProgress.controller.js";

const missionRouter = Router();

// GET api/mission/data/:missionCategory
missionRouter.get("/data/:missionCategory", protect, getMission);

// GET api/mission/data
missionRouter.get("/data", protect, getProgress);

// PUT api/mission/progress
missionRouter.put("/progress", protect, putProgress);

export default missionRouter;
