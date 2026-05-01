import { Trophy, Zap, Coins, Target } from "lucide-react";
import { Card } from "@/components/ui/card";

export function StatsGrid({ stats }) {
  const items = [
    {
      label: "Wins",
      value: stats.wins,
      icon: <Trophy className="text-emerald-500" />,
      bg: "bg-emerald-50",
    },
    {
      label: "XP Points",
      value: stats.xp?.toLocaleString(),
      icon: <Zap className="text-blue-500" />,
      bg: "bg-blue-50",
    },
    {
      label: "Arena Coins",
      value: stats.coin,
      icon: <Coins className="text-amber-500" />,
      bg: "bg-amber-50",
    },
    {
      label: "Win Rate",
      value: `${stats.winRate}%`,
      icon: <Target className="text-rose-500" />,
      bg: "bg-rose-50",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {items.map((item, i) => (
        <Card
          key={i}
          className="p-4 bg-white border-slate-200 shadow-sm flex items-center gap-4"
        >
          <div className={`p-2.5 rounded-lg ${item.bg}`}>{item.icon}</div>
          <div>
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tight">
              {item.label}
            </p>
            <p className="text-xl font-bold text-slate-900">{item.value}</p>
          </div>
        </Card>
      ))}
    </div>
  );
}
