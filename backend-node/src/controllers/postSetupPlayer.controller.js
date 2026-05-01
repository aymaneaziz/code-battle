import User from "../models/User.model.js";
import Avatar from "../models/PlayerSetupModels/avatar.model.js";
import Language from "../models/PlayerSetupModels/language.model.js";
import BattlePreference from "../models/PlayerSetupModels/BattlePreference.model.js";
import CodingExperience from "../models/PlayerSetupModels/CodingExperience.model.js";

const postSetupPlayer = async (req, res) => {
  try {
    const clerkId = req.auth.userId;
    const {
      username,
      displayName,
      location,
      bio,
      avatarId, // Ex: "cyber-ninja" (string)
      languageId, // Ex: ["js", "python"] (array of strings)
      preferenceId, // Ex: "hard-mode" (string)
      experienceId, // Ex: "senior" (string)
      setupCompleted,
    } = req.body;

    const user = await User.findOne({ clerkId });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Validation des champs obligatoires
    if (setupCompleted === true) {
      if (!username || !displayName || !location) {
        return res
          .status(400)
          .json({ message: "Champs obligatoires manquants." });
      }
    }

    // --- LOGIQUE DE MAPPING (Recherche des _id de MongoDB) ---

    // 1. Trouver l'_id de l'Avatar
    if (avatarId) {
      const avatarDoc = await Avatar.findOne({ avatarId: avatarId });
      if (avatarDoc) user.selectedAvatar = avatarDoc._id; // On stocke l'ObjectId
    }

    // 2. Trouver les _id des Langages (si c'est un tableau)
    if (languageId && Array.isArray(languageId)) {
      const languageDocs = await Language.find({
        languageId: { $in: languageId },
      });
      user.preferences.language = languageDocs.map((doc) => doc._id);
    } else if (languageId) {
      // Si c'est une seule string envoyée par erreur
      const langDoc = await Language.findOne({ languageId });
      if (langDoc) user.preferences.language = [langDoc._id];
    }

    // 3. Trouver l'_id de la Battle Preference
    if (preferenceId) {
      const prefDoc = await BattlePreference.findOne({
        preferenceId: preferenceId,
      });
      if (prefDoc) user.preferences.battlePreference = prefDoc._id;
    }

    // 4. Trouver l'_id de la Coding Experience
    if (experienceId) {
      const expDoc = await CodingExperience.findOne({
        experienceId: experienceId,
      });
      if (expDoc) user.preferences.codingExperience = expDoc._id;
    }

    // --- MISE À JOUR DES INFOS CLASSIQUES ---
    user.username = username || user.username;
    user.displayName = displayName || user.displayName;
    user.location = location || user.location;
    user.bio = bio || user.bio;
    user.setupCompleted = setupCompleted;

    await user.save();

    return res.status(200).json({
      message: "Setup updated",
      setupCompleted: user.setupCompleted,
    });
  } catch (error) {
    console.error("Setup Error:", error);
    if (error.code === 11000)
      return res.status(400).json({ message: "Username exists" });
    return res.status(500).json({ message: "Server Error" });
  }
};

export default postSetupPlayer;
