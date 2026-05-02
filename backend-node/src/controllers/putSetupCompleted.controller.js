import User from "../models/User.model.js";

const putSetupPlayer = async (req, res) => {
  try {
    const clerkId = req.auth.userId;
    const { setupCompleted } = req.body; // Katji mn lfrontend (true/false)

    // On s'assure que la valeur est bien un booléen
    if (typeof setupCompleted !== "boolean") {
      return res.status(400).json({ message: "Invalid data format" });
    }

    const updatedUser = await User.findOneAndUpdate(
      { clerkId },
      { $set: { setupCompleted: setupCompleted } },
      { new: true },
    ).select("setupCompleted");

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    return res.status(200).json({
      message: "Setup status updated successfully",
      setupCompleted: updatedUser.setupCompleted,
    });
  } catch (error) {
    console.error("Error updating setup status:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

export default putSetupPlayer;
