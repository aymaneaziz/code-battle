import { Router } from "express";

const userRouter = Router();

userRouter.get("/", (req, res) => {
  res.send({ message: "Get users " });
});
userRouter.get("/:id", (req, res) => {
  res.send({ message: "Get specific user " });
});
userRouter.post("/", (req, res) => {
  res.send({ message: "Create user " });
});
userRouter.put("/:id", (req, res) => {
  res.send({ message: "Update user " });
});
userRouter.delete("/:id", (req, res) => {
  res.send({ message: "Delete user " });
});

export default userRouter;
