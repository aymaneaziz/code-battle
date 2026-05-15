import User from "../../models/user.model.js";
import Rank from "../../models/SystemModels/rank.model.js";
import Level from "../../models/SystemModels/level.model.js";

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
  const xp = user.stats?.xp ?? 100;
  const level = await Level.findOne({
    minXp: { $lte: xp },
    maxXp: { $gte: xp },
  });
  if (level) user.stats.level = level.levelNumber;

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
      currentStreak: user.stats?.currentStreak,
    },
    rank: rank
      ? { label: rank.label, iconUrl: rank.iconUrl, rankId: rank.rankId }
      : { label: "Unranked", iconUrl: "⚔️", rankId: null },
  };
}
