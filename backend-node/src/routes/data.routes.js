import { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";
import setupData from "../controllers/setupData.controller.js";

const dataRouter = Router();
//  api/data/setup
dataRouter.get("/setup", protect, setupData);

export default dataRouter;
