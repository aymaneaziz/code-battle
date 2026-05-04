import mongoose from "mongoose";

const systemSchema = new mongoose.Schema(
  {
    _id: {
      //hadi kas5li system ycree only one occurance dyal had l'objet
      type: String,
      default: "SYSTEM_CONFIG",
    },

    currentSeason: { type: Number, default: 1 },
    currentWeek: { type: Number, default: 1 },
    activePlayers: { type: Number, default: 0 },
    battlesToday: { type: Number, default: 0 },
    liveMaches: { type: Number, default: 0 },
    totalPlayers: { type: Number, default: 0 },

    topPlayersThisWeek: [
      {
        userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        rank: Number,
        score: Number,
      },
    ],
  },
  { timestamps: true },
);

const System = mongoose.models.System || mongoose.model("System", systemSchema);
export default System;
