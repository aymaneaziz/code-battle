import { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";

import { getChallenges } from "../controllers/ChallengesPageControllers/getChallenges.controller.js";
import { getDailyChallenge } from "../controllers/ChallengesPageControllers/getDailyChallenge.controller.js";
import { getUserProgress } from "../controllers/ChallengesPageControllers/getUserProgress.controller.js";
import getChallengeById from "../controllers/ChallengesPageControllers/getChallengeById.controller.js";
import { getRandomChallenge } from "../controllers/ChallengesPageControllers/getRandomChallenge.controller.js";

const challengesPageRouter = Router();

// GET /api/challenges/daily -> get the daily challenge
challengesPageRouter.get("/daily", protect, getDailyChallenge);

// GET /api/challenges -> get all challenges with query filters
challengesPageRouter.get("/", protect, getChallenges);

// GET /api/challenges/progress -> get progress stats for the widget
challengesPageRouter.get("/progress", protect, getUserProgress);

// GET /api/challenges/random -> get random challenge
challengesPageRouter.get("/random", protect, getRandomChallenge);
// GET /api/challenges/:id -> get challenge by Id
challengesPageRouter.get("/:challengeId", protect, getChallengeById);

export default challengesPageRouter;
