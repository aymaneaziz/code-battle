import { Router } from "express";

const authRouter = Router();

authRouter.post("/sign-up", (req, res) => {
  res.send({ message: "Signup endpoint" });
});

authRouter.post("/sign-in", (req, res) => {
  res.send({ message: "Signin endpoint" });
});
authRouter.post("/sign-out", (req, res) => {
  res.send({ message: "Signout endpoint" });
});
export default authRouter;
