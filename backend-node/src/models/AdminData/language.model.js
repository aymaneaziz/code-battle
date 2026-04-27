import mongoose from "mongoose";

const languageSchema = new mongoose.Schema(
  {
    languageId: {
      type: String,
      required: true,
      unique: true,
    },
    name: {
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

const Language = mongoose.model("language", languageSchema);
export default Language;
