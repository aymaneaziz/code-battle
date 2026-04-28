import mongoose from "mongoose";

const avatarSchema = new mongoose.Schema(
  {
    avatarId: { type: String, required: true, unique: true, trim: true },
    label: { type: String, required: true, trim: true },
    iconUrl: { type: String, required: true, trim: true },
  },
  { timestamps: true, _id: false }, // _id: false car avatarId sert de clé unique
);

const Avatar = mongoose.model("Avatar", avatarSchema);
export default Avatar;
