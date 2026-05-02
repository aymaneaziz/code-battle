import User from "../models/User.model.js";

const postSetupPlayer = async (req, res) => {
  try {
    const clerkId = req.auth.userId;
    const {
      username,
      displayName,
      location,
      bio,
      avatarId,
      languageId,
      preferenceId,
      experienceId,
      setupCompleted,
    } = req.body;

    // Find the user
    const user = await User.findOne({ clerkId });
    if (!user) return res.status(404).json({ message: "User not found" });

    // Validation for final submission
    if (setupCompleted === true) {
      if (!username || !displayName || !location) {
        return res
          .status(400)
          .json({ message: "Champs obligatoires manquants." });
      }
    }

    // Update Preferences
    if (avatarId) user.selectedAvatar = avatarId;
    if (preferenceId) user.preferences.battlePreference = preferenceId;
    if (experienceId) user.preferences.codingExperience = experienceId;
    if (languageId) {
      user.preferences.language = Array.isArray(languageId)
        ? languageId
        : [languageId];
    }

    // Update classic profile info
    user.username = username || user.username;
    user.displayName = displayName || user.displayName;
    user.location = location || user.location;
    user.bio = bio || user.bio;
    user.setupCompleted = setupCompleted;

    // Save
    await user.save();

    return res.status(200).json({
      message: "Setup updated successfully",
      setupCompleted: user.setupCompleted,
    });
  } catch (error) {
    console.error("Setup Error:", error);

    // Handle Duplicate Username
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "This username is already taken." });
    }

    return res.status(500).json({ message: "Server Error" });
  }
};

export default postSetupPlayer;
