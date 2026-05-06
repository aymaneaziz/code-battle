import mongoose from "mongoose";
import { generateId } from "../../config/idGenerator.js";

const languageSchema = new mongoose.Schema(
  {
    languageId: {
      type: String,
      required: true,
      unique: true,
      default: () => generateId("language"),
    },
    name: { type: String, required: true, trim: true },
    iconUrl: { type: String, required: true, trim: true },
  },
  { timestamps: true },
);

const Language =
  mongoose.models.Language || mongoose.model("Language", languageSchema);
export default Language;
