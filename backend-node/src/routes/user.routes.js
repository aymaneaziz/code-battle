import { Router } from "express";
import {
  homeController,
  getUserController,
  createUserController,
  updateUserController,
  deleteUserController,
} from "../controllers/user.controller.js";

const userRouter = Router();

userRouter.get("/", homeController);
userRouter.get("/:id", getUserController);
userRouter.post("/", createUserController);
userRouter.put("/:id", updateUserController);
userRouter.delete("/:id", deleteUserController);

export default userRouter;
