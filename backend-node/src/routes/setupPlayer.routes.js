import { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";
import setupPlayer from "../controllers/setupPlayer.controller.js";

const setupPlayerRouter = Router();
//  api/data/setup
setupPlayerRouter.get("/setup", protect, setupPlayer);

export default setupPlayerRouter;
