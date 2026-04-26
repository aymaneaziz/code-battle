import mongoose from "mongoose";
const badgeSchema = new mongoose.Schema(
  {
    badgeId: { type: String, required: true },
    name: { type: String, required: true },
    descrtiption: { type: String, required: true },
    iconUrl: { type: String, requires: true },
    earnedAt: { type: Date, default: Date.now },
  },
  { _id: false },
);

const statsSchema = new mongoose.Schema(
  {
    elo: { type: Number, default: 0 },
    rank: { type: Number, default: 0 },
    wins: { type: Number, default: 0 },
    losses: { type: Number, default: 0 },
    draws: { type: Number, default: 0 },
    winRate: { type: Number, default: 0.0 },
    totalMatches: { type: Number, default: 0 },
    currentStreak: { type: Number, default: 0 },
    bestStreak: { type: Number, default: 0 },
    xp: { type: Number, default: 0 },
    level: { type: Number, default: 1 },
    averageSolveTime: { type: Number, default: 0 },
    fastestSolveTime: { type: Number, default: 0 },
    hardestWin: { type: String, default: "None" },
    prefectRuns: { type: Number, default: 0 },
    itemsUsed: { type: Number, default: 0 },
    hintUsed: { type: Number, default: 0 },
  },
  { _id: false },
);
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
    avatar: {
      type: String,
      default: "🤖",
    },
    unlockedAvatars: {
      type: [String],
      default: ["🤖", "💀", "🐶"],
    },
    coin: { type: Number, default: 0 },
    stats: { type: statsSchema, default: () => ({}) },
    badgesPlayer: [badgeSchema],
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
