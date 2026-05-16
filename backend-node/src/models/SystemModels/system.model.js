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
    weeklyStartDate: { type: Date },
    weeklyEndDate: { type: Date },
    seasonStartDate: { type: Date },
    seasonEndDate: { type: Date },
    lastLeatherboardUpdate: { type: Date },
  },
  { timestamps: true }
);

const System = mongoose.models.System || mongoose.model("System", systemSchema);
export default System;
