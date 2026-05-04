import mongoose from "mongoose";

const systemInfoSchema = new mongoose.Schema({
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
      id: String,
      rank: Number,
      score: Number,
    },
  ],
});

const SystemInfo =
  mongoose.models.SystemInfo || mongoose.model("System", systemInfoSchema);
export default SystemInfo;
