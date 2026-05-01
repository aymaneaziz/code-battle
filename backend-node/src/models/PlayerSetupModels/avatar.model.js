import mongoose from "mongoose";

const avatarSchema = new mongoose.Schema(
  {
    avatarId: { type: String, required: true, unique: true, trim: true },
    label: { type: String, required: true, trim: true },
    iconUrl: { type: String, required: true, trim: true },
    // Si true, tout le monde y a accès par défaut
    isDefault: { type: Boolean, default: false },
  },
  { timestamps: true },
);

const Avatar = mongoose.models.Avatar || mongoose.model("Avatar", avatarSchema);
export default Avatar;
