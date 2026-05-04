import User from "../../models/user.model.js";

import "../../models/PlayerInfoModels/badge.model.js";
import "../../models/PlayerSetupModels/avatar.model.js";
import "../../models/PlayerSetupModels/language.model.js";
import "../../models/PlayerSetupModels/codingExperience.model.js";

const getProfilePlayer = async (req, res) => {
  try {
    const clerkId = req.auth.userId;

    // Recherche de l'utilisateur avec "populate" pour transformer les IDs en objets complets
    const player = await User.findOne({ clerkId })
      .populate("selectedAvatar") // Tjib les détails de l'avatar porté
      .populate("preferences.language") // Tjib les noms/icons des langages
      .populate("preferences.codingExperience") // Tjib les détails d'expérience
      .populate("preferences.battlePreference")
      .populate("unlockedAvatars")
      .populate("badgesPlayer.badge");

    if (!player) {
      return res
        .status(404)
        .json({ message: "Joueur introuvable dans la base de données" });
    }

    // Logic pour vérifier le winRate avant d'envoyer (Hta f l'Schema default 0)
    const total = player.stats.wins + player.stats.losses;
    if (total > 0 && player.stats.totalMatches !== total) {
      player.stats.totalMatches = total;
      player.stats.winRate = Math.round((player.stats.wins / total) * 100);
    }

    // Mise à jour de la dernière activité
    player.lastActive = new Date();
    player.status = "online"; // Kat-welli online melli kat-fetchi l'profile
    await player.save();

    // Construction de l'objet de réponse avec uniquement les champs spécifiques
    // Hna kansifto ghir dakchi li htajiti bdebt f l-front
    const profileResponse = {
      username: player.username, // Inclus car nécessaire pour l'identité
      displayName: player.displayName,
      bio: player.bio,
      location: player.location,
      status: player.status,
      selectedAvatar: player.selectedAvatar,
      unlockedAvatars: player.unlockedAvatars,
      badgesPlayer: player.badgesPlayer,
      preferences: player.preferences,
      stats: player.stats,
      lastActive: player.lastActive,
      createdAt: player.createdAt,
    };

    res.status(200).json(profileResponse);
  } catch (error) {
    console.error("Error in getProfilePLayer:", error);
    res.status(500).json({
      message: "Erreur serveur lors de la récupération du profil",
      error: error.message,
    });
  }
};

export { getProfilePlayer };
