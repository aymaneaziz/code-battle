import { Router } from "express";
import { syncUser, logoutUser } from "../controllers/user.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { isAdmin } from "../middlewares/role.middleware.js";

const userRouter = Router();
// api/user/sync
userRouter.post("/sync", protect, syncUser);
// api/user/logout
userRouter.post("/logout", protect, logoutUser);
//  api/user/admin
userRouter.get("/admin", protect, isAdmin);

export default userRouter;
