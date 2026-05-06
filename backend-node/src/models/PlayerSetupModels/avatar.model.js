import mongoose from "mongoose";
import { generateId } from "../../config/idGenerator.js";

const avatarSchema = new mongoose.Schema(
  {
    avatarId: {
      type: String,
      required: true,
      unique: true,
      default: () => generateId("avatar"),
    },
    label: { type: String, required: true, trim: true },
    iconUrl: { type: String, required: true, trim: true },
    // Si true, tout le monde y a accès par défaut
    isDefault: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const Avatar = mongoose.models.Avatar || mongoose.model("Avatar", avatarSchema);
export default Avatar;
