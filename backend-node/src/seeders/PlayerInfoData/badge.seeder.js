import Badge from "../../models/PlayerInfoModels/badge.model.js";
import { seedData } from "../../config/seederEngine.js";

const badges = [
  {
    badgeId: "badge_001",
    name: "First Steps",
    description: "Complete your first challenge.",
    iconUrl: "🌱",
    rarity: "Common",
  },
  {
    badgeId: "badge_002",
    name: "Bug Hunter",
    description: "Fix 10 bugs successfully.",
    iconUrl: "🐛",
    rarity: "Rare",
  },
  {
    badgeId: "badge_003",
    name: "Algorithm Master",
    description: "Solve 50 algorithmic problems.",
    iconUrl: "🧠",
    rarity: "Epic",
  },
  {
    badgeId: "badge_004",
    name: "Code Legend",
    description: "Reach the top 1% of the leaderboard.",
    iconUrl: "👑",
    rarity: "Legendary",
  },
  {
    badgeId: "badge_005",
    name: "Speed Runner",
    description: "Solve a challenge in record time.",
    iconUrl: "⚡",
    rarity: "Rare",
  },
  {
    badgeId: "badge_006",
    name: "Fire Coder",
    description: "Maintain a 5-day coding streak.",
    iconUrl: "🔥",
    rarity: "Epic",
  },
  {
    badgeId: "badge_007",
    name: "Ice Breake",
    description: "Join your first team challenge.",
    iconUrl: "❄️",
    rarity: "Common",
  },
];

export const seedBadges = () => seedData(Badge, badges, "badgeId");
