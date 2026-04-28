import mongoose from "mongoose";

const languageSchema = new mongoose.Schema(
  {
    languageId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    name: { type: String, required: true, trim: true },
    iconUrl: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

// Correction : Nom du modèle mis en Majuscule pour la cohérence
const Language = mongoose.model("Language", languageSchema);
export default Language;
