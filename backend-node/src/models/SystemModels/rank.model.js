import mongoose from "mongoose";
import { generateId } from "../../config/idGenerator.js";

const rankSchema = new mongoose.Schema(
  {
    rankId: {
      type: String,
      required: true,
      unique: true,
      default: () => generateId("rank"),
    },
    label: { type: String, required: true, trim: true },
    iconUrl: { type: String, required: true, trim: true },
    minElo: { type: Number, required: true },
    maxElo: { type: Number, required: true },
  },
  { timestamps: true },
);

const Rank = mongoose.models.Rank || mongoose.model("Rank", rankSchema);
export default Rank;
