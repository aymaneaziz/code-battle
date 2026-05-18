import User from "../../models/user.model.js";

const putProfilePlayer = async (req, res) => {
  try {
    const clerkId = req.auth.userId;
    const { displayName, location, bio, selectedAvatar } = req.body;

    // 9elleb 3la user f db
    const user = await User.findOne({ clerkId });

    if (!user) {
      return res.status(404).json({ message: "Player not found " });
    }

    //  t aked ghi lavatar lli luser debloka
    if (selectedAvatar) {
      const hasAvatar = user.unlockedAvatars.some(
        (id) => id.toString() === selectedAvatar,
      );
      if (hasAvatar) {
        user.selectedAvatar = selectedAvatar;
      }
    }

    // update
    user.displayName = displayName ?? user.displayName;
    user.location = location || user.location;
    user.bio = bio || user.bio;

    await user.save();

    // Rejje3 ghi success status
    res.status(200).json({ message: "Profile updated successfully" });
  } catch (error) {
    console.error("Update Error:", error);
    res.status(500).json({
      message: "Error when profile updating ",
      error: error.message,
    });
  }
};

export default putProfilePlayer;
