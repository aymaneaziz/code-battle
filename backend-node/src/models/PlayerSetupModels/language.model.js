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

const Language =
  mongoose.models.Language || mongoose.model("Language", languageSchema);
export default Language;
