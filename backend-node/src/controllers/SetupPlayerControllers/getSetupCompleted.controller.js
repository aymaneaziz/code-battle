import User from "../../models/User.model.js";

const getSetupCompleted = async (req, res) => {
  try {
    // On récupère le clerkId mn la requête (men middleware dyal auth)
    const clerkId = req.auth.userId;

    const user = await User.findOne({ clerkId }).select("setupCompleted");

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // On renvoie juste l'état true ou false
    return res.status(200).json({ setupCompleted: user.setupCompleted });
  } catch (error) {
    console.error("Error fetching setup status:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export default getSetupCompleted;
