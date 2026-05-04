import { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";
import getSetupPlayer from "../controllers/SetupPlayerControllers/getSetupPlayer.controller.js";
import postSetupPlayer from "../controllers/SetupPlayerControllers/postSetupPlayer.controller.js";
import getSetupCompleted from "../controllers/SetupPlayerControllers/getSetupCompleted.controller.js";
import putSetupCompleted from "../controllers/SetupPlayerControllers/putSetupCompleted.controller.js";

const setupPlayerRouter = Router();
// GET api/data/setup
setupPlayerRouter.get("/setup", protect, getSetupPlayer);
// POST  api/data/setup
setupPlayerRouter.post("/setup", protect, postSetupPlayer);

// GET api/data/setup-completed
setupPlayerRouter.get("/setup-completed", protect, getSetupCompleted);

// PUT api/data/setup-completed
setupPlayerRouter.put("/setup-completed", protect, putSetupCompleted);

export default setupPlayerRouter;
