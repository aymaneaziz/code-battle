import mongoose from "mongoose";

const leaderboardSchema = new mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },

    bestRank: { type: Number, default: 0 },
    bestElo: { type: Number, default: 400 },
    currentGlobalRank: { type: Number, default: 0 },
  },
  { timestamps: true }
);

const Leaderboard =
  mongoose.models.Leaderboard ||
  mongoose.model("Leaderboard", leaderboardSchema);
export default Leaderboard;
