import User from "../../models/user.model.js";
import Rank from "../../models/SystemModels/rank.model.js";

export async function getPlayerProfile(userId) {
  const user = await User.findOne({ userId })
    .select("userId displayName selectedAvatar badgesPlayer stats")
    .populate("selectedAvatar", "iconUrl label avatarId")
    .populate("badgesPlayer.badge", "name iconUrl rarity")
    .lean();

  if (!user) return null;

  // Resolve rank from ELO
  const elo = user.stats?.elo ?? 400;
  const rank = await Rank.findOne({
    minElo: { $lte: elo },
    maxElo: { $gte: elo },
  })
    .select("label iconUrl minElo maxElo rankId")
    .lean();

  return {
    userId: user.userId,
    displayName: user.displayName,
    selectedAvatar: user.selectedAvatar ?? null,
    badgesPlayer:
      user.badgesPlayer?.map((b) => ({
        name: b.badge?.name,
        iconUrl: b.badge?.iconUrl,
        rarity: b.badge?.rarity,
      })) ?? [],
    stats: {
      elo: user.stats?.elo,
      wins: user.stats?.wins,
      losses: user.stats?.losses,
      winRate: user.stats?.winRate,
      totalMatches: user.stats?.totalMatches,
      level: user.stats?.level,
      bestStreak: user.stats?.bestStreak,
    },
    rank: rank
      ? { label: rank.label, iconUrl: rank.iconUrl, rankId: rank.rankId }
      : { label: "Unranked", iconUrl: "⚔️", rankId: null },
  };
}
