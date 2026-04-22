import mongoose from "mongoose";
import { DB_URI, NODE_ENV } from "../config/env.js";

if (!DB_URI) {
  console.error(
    "Database URI is not defined in environment variables inside .env.{development/production}.local",
  );
  process.exit(1);
}

const connectToDatabase = async () => {
  try {
    await mongoose.connect(DB_URI);
    console.log(`Connected to MongoDB in ${NODE_ENV} environment`);
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  }
};

export default connectToDatabase;
