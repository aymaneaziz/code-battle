export const RANK_CONFIG = {
  Bronze: {
    label: "Bronze",
    icon: "🥉",
    color: "text-amber-700",
    bgColor: "bg-amber-100",
    borderColor: "border-amber-400",
  },
  Silver: {
    label: "Silver",
    icon: "🥈",
    color: "text-slate-500",
    bgColor: "bg-slate-100",
    borderColor: "border-slate-400",
  },
  Gold: {
    label: "Gold",
    icon: "🥇",
    color: "text-yellow-600",
    bgColor: "bg-yellow-50",
    borderColor: "border-yellow-400",
  },
  Platinum: {
    label: "Platinum",
    icon: "💠",
    color: "text-cyan-600",
    bgColor: "bg-cyan-50",
    borderColor: "border-cyan-400",
  },
  Diamond: {
    label: "Diamond",
    icon: "💎",
    color: "text-blue-600",
    bgColor: "bg-blue-50",
    borderColor: "border-blue-400",
  },
  Master: {
    label: "Master",
    icon: "🏆",
    color: "text-purple-600",
    bgColor: "bg-purple-50",
    borderColor: "border-purple-400",
  },
  Grandmaster: {
    label: "Grandmaster",
    icon: "👑",
    color: "text-red-600",
    bgColor: "bg-red-50",
    borderColor: "border-red-400",
  },
  Legend: {
    label: "Legend",
    icon: "🔥",
    color: "text-orange-600",
    bgColor: "bg-orange-100",
    borderColor: "border-orange-500",
  },
};

export function getRankConfig(label) {
  return (
    RANK_CONFIG[label] ?? {
      label: label ?? "Unranked",
      icon: "⚔️",
      color: "text-slate-400",
      bgColor: "bg-slate-100",
      borderColor: "border-slate-300",
    }
  );
}
