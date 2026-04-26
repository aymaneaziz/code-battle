import { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";
import setupData from "../controllers/setupData.controller.js";

const dataRouter = Router();

dataRouter.get("/setup", protect, setupData);

export default dataRouter;