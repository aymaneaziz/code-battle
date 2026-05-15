import { getSeasonEndDate } from "../controllers/SystemeControllers/getSeasonEndDate.controller.js";
import { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";

const endDateRouter = Router();

// GET /api/endDate/seasonEndDate
endDateRouter.get("/seasonEndDate", protect, getSeasonEndDate);

export default endDateRouter;
