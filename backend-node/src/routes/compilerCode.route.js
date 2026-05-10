import { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { executeCode } from "../controllers/CompilerControllers/executeCodeController.js";

const compilerRouter = Router();
// POST /api/execution/run -> execute code for a challenge
compilerRouter.post("/run", protect, executeCode);

export default compilerRouter;
