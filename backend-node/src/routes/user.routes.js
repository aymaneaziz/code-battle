import { Router } from "express";
import { syncUser, logoutUser } from "../controllers/user.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/role.middleware.js";

const userRouter = Router();

userRouter.post("/sync", protect, syncUser);
userRouter.post("/logout", protect, logoutUser);
userRouter.get("/admin", protect, isAdmin);

export default userRouter;
