import { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";

import { getChallenges } from "../controllers/ChallengesPageControllers/getChallenges.controller.js";
import { getDailyChallenge } from "../controllers/ChallengesPageControllers/getDailyChallenge.controller.js";
import { getUserProgress } from "../controllers/ChallengesPageControllers/getUserProgress.controller.js";

const challengesPageRouter = Router();

// GET /api/challenges/daily -> Fetch the daily challenge
challengesPageRouter.get("/daily", protect, getDailyChallenge);

// GET /api/challenges -> Fetch all challenges with query filters
challengesPageRouter.get("/", protect, getChallenges);

// GET /api/challenges/progress -> Fetch progress stats for the widget
challengesPageRouter.get("/progress", protect, getUserProgress);

export default challengesPageRouter;
