import mongoose from "mongoose";

const battlePreferenceSchema = new mongoose.Schema(
  {
    preferenceId: { type: String, required: true, unique: true, trim: true },
    label: {
      type: String,
      enum: ["Easy", "Medium", "Hard"],
      required: true,
    },
    description: { type: String, required: true, trim: true },
    iconUrl: { type: String, required: true, trim: true },
  },
  { timestamps: true, _id: false },
);

const BattlePreference = mongoose.model(
  "BattlePreference",
  battlePreferenceSchema,
);
export default BattlePreference;
