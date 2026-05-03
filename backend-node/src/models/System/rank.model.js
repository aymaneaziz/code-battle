import mongoose from "mongoose";

const rankSchema = new mongoose.Schema(
  {
    rankId: { type: String, required: true, unique: true, trim: true },
    label: { type: String, required: true, trim: true },
    iconUrl: { type: String, required: true, trim: true },
    minElo: { type: Number, required: true },
    maxElo: { type: Number, required: true },
  },
  { timestamps: true }
);

const Rank = mongoose.models.Rank || mongoose.model("Rank", rankSchema);
export default Rank;
