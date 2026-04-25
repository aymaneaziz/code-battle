import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    clerkId: {
      type: String,
      required: true,
      unique: true,
    },
    username: {
      type: String,
      required: [true, "Username is required"],
      trim: true,
      minlength: [3, "Too short"],
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
    },
    role: {
      type: String,
      enum: ["player", "admin"],
      default: "player",
    },
    status: {
      type: String,
      enum: ["online", "offline"],
      default: "offline",
    },
    lastActive: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true },
);
// Middleware to hash password before saving
/*
userSchema.pre("save", function (next) {
  if (this.isModified("password")) {
    // Hash the password before saving (you can use bcrypt or any hashing library)
    this.password = hashPassword(this.password);
  }
  next();
});

function hashPassword(password) {
  // Implement your password hashing logic here (e.g., using bcrypt)
  return password; // Placeholder, replace with actual hashed password
}
*/
const User = mongoose.model("User", userSchema);
export default User;
