import {
  Trophy,
  Zap,
  Coins,
  Target,
  Swords,
  Skull,
  Flame,
  Globe,
} from "lucide-react";
import { Card } from "@/components/ui/card";

export function StatsGrid({ stats }) {
  const items = [
    {
      label: "Arena Coins",
      value: stats.coin || 0,
      icon: <Coins className="h-5 w-5 text-amber-500" />,
      bg: "bg-amber-50",
    },
    {
      label: "Total XP",
      value: stats.xp?.toLocaleString() || 0,
      icon: <Zap className="h-5 w-5 text-blue-500" />,
      bg: "bg-blue-50",
    },
    {
      label: "Global Rank",
      value: `#${stats.globalRank || "---"}`,
      icon: <Globe className="h-5 w-5 text-indigo-500" />,
      bg: "bg-indigo-50  ",
    },
    {
      label: "Win Rate",
      value: `${stats.winRate || 0}%`,
      icon: <Target className="h-5 w-5 text-rose-500" />,
      bg: "bg-rose-50",
    },
    {
      label: "Wins",
      value: stats.wins || 0,
      icon: <Swords className="h-5 w-5 text-emerald-500" />,
      bg: "bg-emerald-50",
    },
    {
      label: "Losses",
      value: stats.losses || 0,
      icon: <Skull className="h-5 w-5 text-slate-500" />,
      bg: "bg-slate-100",
    },
    {
      label: "Total Matches",
      value: stats.totalMatches || 0,
      icon: <Trophy className="h-5 w-5 text-orange-500" />,
      bg: "bg-orange-50",
    },
    {
      label: "Best Streak",
      value: `x${stats.bestStreak}` || 0,
      icon: <Flame className="h-5 w-5 text-red-500" />,
      bg: "bg-red-50",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {items.map((item, i) => (
        <Card
          key={i}
          className="p-6 bg-white border-slate-200 shadow-sm flex flex-col items-center justify-center text-center gap-3 transition-all hover:shadow-md"
        >
          {/* Icon Container - Centered at top */}
          <div className={`p-3 rounded-2xl } flex items-center justify-center`}>
            {item.icon}
          </div>

          {/* Text & Value - Centered vertically */}
          <div className="space-y-1">
            <p className="text-[10px] font-bold text-slate-600 uppercase tracking-widest">
              {item.label}
            </p>
            <p className="text-xl font-black text-slate-900">{item.value}</p>
          </div>
        </Card>
      ))}
    </div>
  );
}
