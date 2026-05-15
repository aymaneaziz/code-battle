import mongoose from "mongoose";
import { generateId } from "../../config/idGenerator.js";

const levelSchema = new mongoose.Schema(
  {
    levelId: {
      type: String,
      required: true,
      unique: true,
      default: () => generateId("level"),
    },
    levelNumber: {
      type: Number,
      required: true,
      unique: true,
    },
    minXp: {
      type: Number,
      required: true,
    },
    maxXp: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true },
);

const Level = mongoose.models.Level || mongoose.model("Level", levelSchema);
export default Level;
