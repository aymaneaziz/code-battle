// Dependencies
import express from "express";
import http from "http";
import cors from "cors";
import cookieParser from "cookie-parser";
import { PORT, VITE_FRONTEND_URL } from "./config/env.js";

// Routes
import userRouter from "./routes/user.routes.js";
import setupPlayerRouter from "./routes/setupPlayer.routes.js";
import profilePlayerRouter from "./routes/profilePlayer.route.js";

import homePageRouter from "./routes/homePage.route.js";

// Middlewares
import errorMiddleware from "./middlewares/error.middleware.js";
import { clerkMiddleware } from "@clerk/express";
import errorClerk from "./middlewares/errorClerk.middleware.js";

// DataBase
import connectToDatabase from "./database/mongodb.js";
import challengePageRouter from "./routes/challengesPage.route.js";
import shopPageRouter from "./routes/shopPage.route.js";

import compilerRouter from "./routes/compilerCode.route.js";
import { initWebSocketServer } from "./websocket/wsServer.js";

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
// Synch and add new User------------------------------------------
app.use("/api/user", userRouter);
// Setup player data------------------------------------------
app.use("/api/data", setupPlayerRouter);
app.use("/api/data", profilePlayerRouter);
// To get The data we need for the HomePage-----------------------------------
app.use("/api/home", homePageRouter);
// To get The data we need for the challenges-----------------------------------
app.use("/api/challenges", challengePageRouter);
// To get The data we need for the shop-----------------------------------
app.use("/api/shop", shopPageRouter);
// To execute code for a challenge-----------------------------------
app.use("/api/execution", compilerRouter);

//dima ftali had lmiddelware dyal clerk
app.use(errorClerk);
app.use(errorMiddleware); // Global error handling middleware

// Create HTTP server and initialize WebSocket server on top of it
const server = http.createServer(app);
// Initialize WebSocket server (this will listen for WS connections on the same port as Express)
initWebSocketServer(server);

server.listen(PORT, async () => {
  console.log(`Server is running on port http://localhost:${PORT}`);

  await connectToDatabase(); // Connect to the database when the server starts
});

export default app;
