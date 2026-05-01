import Avatar from "../models/PlayerSetupModels/avatar.model.js";
import User from "../models/user.model.js";
// syncUser ----------------------------------
const syncUser = async (req, res) => {
  try {
    const { userId, sessionClaims } = req.auth;
    const { email, username } = req.body;

    const roleFromClerk = sessionClaims?.role || "player";

    // 1. Njibo ga3 les avatars li huma "default"
    // On récupère juste le champ 'avatarId' (ou '_id' selon ton choix précédent)
    const defaultAvatars = await Avatar.find({ isDefault: true }).select(
      "avatarId",
    );

    // 2. Synchronisation de l'utilisateur
    const user = await User.findOneAndUpdate(
      { clerkId: userId },
      {
        clerkId: userId,
        email,
        username,
        role: roleFromClerk,
        status: "online",
        lastActive: Date.now(),
        // $addToSet: hada kaykhlina n-ajoutiw les IDs bla madir duplication
        // It only adds if the ID doesn't already exist in the array
        $addToSet: {
          unlockedAvatars: { $each: defaultAvatars },
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
