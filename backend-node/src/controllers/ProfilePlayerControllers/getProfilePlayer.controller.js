import User from "../../models/user.model.js";

import "../../models/PlayerInfoModels/badge.model.js";
import "../../models/PlayerSetupModels/avatar.model.js";
import "../../models/PlayerSetupModels/language.model.js";
import "../../models/PlayerSetupModels/codingExperience.model.js";
import Rank from "../../models/SystemModels/rank.model.js";
import Level from "../../models/SystemModels/level.model.js";

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
      return res.status(404).json({ message: "Player not found " });
    }

    // Logic pour vérifier le winRate avant d'envoyer
    const total = player.stats.wins + player.stats.losses;
    if (total > 0 && player.stats.totalMatches !== total) {
      player.stats.totalMatches = total;
      player.stats.winRate = Math.round((player.stats.wins / total) * 100);
    }

    const currentRank = await Rank.findOne({
      minElo: { $lte: player.stats.elo },
      maxElo: { $gte: player.stats.elo },
    });

    // Level Logic
    const currentLevel = await Level.findOne({
      minXp: { $lte: player.stats.xp },
      maxXp: { $gte: player.stats.xp },
    });
    if (currentLevel) player.stats.level = currentLevel.levelNumber;

    // Mise à jour de la dernière activité
    player.lastActive = new Date();
    player.status = "online"; // Kat-welli online melli katfetchi l'profile
    await player.save();

    // Hna kansifto ghir dakchi li htajiti bdebt f lfront
    const profileResponse = {
      userId: player.userId,
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
      level: currentLevel,
      rank: currentRank,
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
