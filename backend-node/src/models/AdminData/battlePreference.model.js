import mongoose from "mongoose";

const battlePreferenceSchema = new mongoose.Schema(
    {
        preferenceId: {
            type: String,
            required: true,
            unique: true,
        },
        label: {
            type: String,
            enum: ["Easy", "Medium", "Hard"],
            required: true,
        },
        description: {
            type: String,
            required: true,
        },
        iconUrl: {
            type: String,
            required: true,
        },
    },
    { timestamps: true },
);

const BattlePreference = mongoose.model("BattlePreference", battlePreferenceSchema);
export default BattlePreference;