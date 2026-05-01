import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { PORT, VITE_FRONTEND_URL } from "./config/env.js";
import userRouter from "./routes/user.routes.js";
import setupPlayerRouter from "./routes/setupPlayer.routes.js";

import connectToDatabase from "./database/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";

import { clerkMiddleware } from "@clerk/express";
import errorClerk from "./middlewares/errorClerk.middleware.js";
import profilePlayer from "./routes/profilePlayer.route.js";

const app = express();

app.use(cors()); // used to enable CORS (Cross-Origin Resource Sharing) for all routes, allowing requests from different origins.
app.use(express.json()); // used to parse the body on the request object
app.use(express.urlencoded({ extended: false })); // used to  parse the body on the request object
app.use(cookieParser()); // used to parse the cookies on the request object
app.use(clerkMiddleware());
app.use(
  cors({
    origin: VITE_FRONTEND_URL,
    credentials: true,
  }),
);
//Synch and add new User------------------------------------------
app.use("/api/user", userRouter);
// Setup player data------------------------------------------
app.use("/api/data", setupPlayerRouter);
app.use("/api/data", profilePlayer);

//dima ftali had lmiddelware dyal clerk
app.use(errorClerk);
app.use(errorMiddleware); // Global error handling middleware

app.listen(PORT, async () => {
  console.log(`Server is running on port http://localhost:${PORT}`);

  await connectToDatabase(); // Connect to the database when the server starts
});

export default app;
