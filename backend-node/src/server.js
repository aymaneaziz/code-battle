import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import { PORT } from "./config/env.js";
import userRouter from "./routes/user.routes.js";

import connectToDatabase from "./database/mongodb.js";
import errorMiddleware from "./middlewares/error.middleware.js";

const app = express();

app.use(cors()); // used to enable CORS (Cross-Origin Resource Sharing) for all routes, allowing requests from different origins.
app.use(express.json()); // used to parse the body on the request object
app.use(express.urlencoded({ extended: false })); // used to  parse the body on the request object
app.use(cookieParser()); // used to parse the cookies on the request object

app.use("/api/v1/users", userRouter); // Mount the user routes at /api/v1/users

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.use(errorMiddleware); // Global error handling middleware (should be added after all routes)

app.listen(PORT, async () => {
  console.log(`Server is running on port http://localhost:${PORT}`);

  await connectToDatabase(); // Connect to the database when the server starts
});

export default app;
