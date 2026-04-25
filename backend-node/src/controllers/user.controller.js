import User from "../models/user.model.js";

const syncUser = async (req, res) => {
  console.log("Tentative de sync pour :", req.auth.userId);
  try {
    // Récupérer le userId ET les sessionClaims
    const { userId, sessionClaims } = req.auth;
    const { email, username } = req.body;

    // 2. Extraire le rôle depuis les claims de session Clerk
    const roleFromClerk = sessionClaims?.role || "player";

    const user = await User.findOneAndUpdate(
      { clerkId: userId },
      {
        clerkId: userId,
        email,
        username,
        role: roleFromClerk,
        status: "online",
        lastActive: Date.now(),
      },
      { upsert: true, returnDocument: "after" },
    );

    res.status(200).json(user);
  } catch (error) {
    console.error("Sync Error:", error);
    res.status(500).json({ message: error.message });
  }
};

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
