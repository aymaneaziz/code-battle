import { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { getSystemInfo } from "../controllers/HomePage/getSystemInfo.controller.js";

const homePage = Router();
// GET api/home/data
homePage.get("/data", protect, getSystemInfo);

export default homePage;
