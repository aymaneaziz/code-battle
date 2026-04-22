import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: [true, "User ID is required"],
      unique: true,
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
      minLength: [3, "Username must be at least 3 characters long"],
      maxLength: [30, "Username must be at most 30 characters long"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      match: [
        /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
        "Please enter a valid email",
      ],
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minLength: [6, "Password must be at least 6 characters long"],
    },
  },
  {
    timestamps: true,
  },
);

const User = mongoose.model("User", userSchema);

export default User;
