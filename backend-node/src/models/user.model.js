import mongoose from "mongoose";
import { statsSchema } from "./PlayerInfoModels/stats.model.js";

const userSchema = new mongoose.Schema(
  {
    clerkId: { type: String, required: true, unique: true },
    username: { type: String, required: true, trim: true, minlength: 3 },

    email: { type: String, required: true, unique: true, lowercase: true },

    // IDENTITY & PROFILE
    displayName: { type: String, trim: true, default: "" },
    bio: {
      type: String,
      trim: true,
      maxlength: [500, "Bio cannot exceed 500 characters"],
      default: "",
    },
    location: { type: String, trim: true, default: "" },

    // PLAYER STATUS & ROLE
    role: { type: String, enum: ["player", "admin"], default: "player" },
    status: { type: String, enum: ["online", "offline"], default: "offline" },

    // Référence l'ID de l'avatar actuellement porté
    selectedAvatar: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Avatar",
    },

    // Liste des IDs d'avatars que le joueur possède
    unlockedAvatars: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Avatar",
      },
    ],

    // Références aux badges gagnés
    badgesPlayer: [
      {
        badge: { type: mongoose.Schema.Types.ObjectId, ref: "Badge" },
        earnedAt: { type: Date, default: Date.now },
      },
    ],

    // Préférences de jeu (Lien avec vos modèles de Setup)
    preferences: {
      language: [{ type: mongoose.Schema.Types.ObjectId, ref: "Language" }],
      battlePreference: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "BattlePreference",
      },
      codingExperience: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "CodingExperience",
      },
    },
    stats: { type: statsSchema, default: () => ({}) },

    lastActive: {
      type: Date,
      default: Date.now,
    },

    // Had l-field hada howa li kibin lina wach l-player kemel setup ola la
    setupCompleted: {
      type: Boolean,
      default: false, // Par défaut false hta idir "Complete Setup"
    },
  },
  { timestamps: true }
);

// On verifie si le modele 'User' est deja compilé dans mongoose.models
const User = mongoose.models.User || mongoose.model("User", userSchema);

export default User;
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
