import Avatar from "../models/PlayerSetupModels/avatar.model.js";
import User from "../models/user.model.js";
// syncUser
const syncUser = async (req, res) => {
  try {
    const { userId, sessionClaims } = req.auth;
    const { email, username } = req.body;

    const roleFromClerk = sessionClaims?.role || "player";

    // Njibo ga3 les avatars li huma "default"
    // On récupère juste le champ 'avatarId' (ou '_id' selon ton choix précédent)
    const defaultAvatars = await Avatar.find({ isDefault: true }).select(
      "avatarId",
    );
    const defaultAvatarIds = defaultAvatars.map((av) => av._id);

    //Select the first default avatar to be their starting selectedAvatar
    const initialAvatar = defaultAvatarIds[0] || null;

    // Synchronisation de l'utilisateur
    const user = await User.findOneAndUpdate(
      { clerkId: userId },
      {
        // Fields to update EVERY time the user connects/syncs
        $set: {
          email,
          role: roleFromClerk,
          status: "online",
          lastActive: new Date(),
        },
        // Fields to set ONLY the very first time the user account is created (upsert)
        $setOnInsert: {
          clerkId: userId,
          displayName: username,
          selectedAvatar: initialAvatar,
        },
        // Push default avatars only if they don't already exist in the array
        $addToSet: {
          unlockedAvatars: { $each: defaultAvatarIds },
        },
      },
      {
        upsert: true,
        returnDocument: "after",
        setDefaultsOnInsert: true,
      },
    );

    res.status(200).json(user);
  } catch (error) {
    console.error("Sync Error:", error);
    res.status(500).json({ message: error.message });
  }
};

// logout --------------------------
const logoutUser = async (req, res) => {
  try {
    const { userId } = req.auth;

    // On passe le statut en offline
    await User.findOneAndUpdate({ clerkId: userId }, { status: "offline" });

    res.status(200).json({ message: "Utilisateur offline" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
export { syncUser, logoutUser };
