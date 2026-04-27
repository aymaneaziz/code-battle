import mongoose from "mongoose";

const avatarSchema = new mongoose.Schema(
  {
    avatarId: {
      type: String,
      required: true,
      unique: true,
    },
    label: {
      type: String,
      required: true,
    },
    iconUrl: {
      type: String,
      required: true,
    },
  },
  { timestamps: true, _id: false },
);

const Avatar = mongoose.model("Avatar", avatarSchema);
export default Avatar;
