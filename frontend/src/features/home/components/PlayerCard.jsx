import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Trophy, Zap, Target, Flame, Globe } from "lucide-react";

const PlayerCard = ({ player }) => {
  const [playerData] = useState(player.playerData);
  const [rankInfo] = useState(player.rank);

  const items = [
    {
      label: "Win Rate",
      value: `${playerData.stats.winRate || 0}%`,
      icon: <Target className="h-5 w-5 text-rose-500" />,
      bg: "bg-rose-50",
    },
    {
      label: "Total XP",
      value: playerData.stats.totalXp?.toLocaleString() || 0,
      icon: <Zap className="h-5 w-5 text-blue-500" />,
      bg: "bg-blue-50",
    },
    {
      label: "Total Matches",
      value: playerData.stats.prefectRuns || 0,
      icon: <Trophy className="h-5 w-5 text-orange-500" />,
      bg: "bg-orange-50",
    },
    {
      label: "Current Streak",
      value: `x${playerData.stats.currentStreak || 0}`,
      icon: <Flame className="h-5 w-5 text-red-500" />,
      bg: "bg-red-50",
    },
  ];

  return (
    <Card className="h-full relative bg-white/80 backdrop-blur border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden p-6">
      {/* background */}
      <div className="absolute inset-0 bg-linear-to-br from-slate-100/40 to-transparent pointer-events-none" />

      <div className="relative flex flex-col gap-6">
        {/* HEADER */}
        <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6">
          {/* avatar + info */}
          <div className="flex items-center gap-4">
            <div className="h-20 w-20 rounded-full border border-slate-200 bg-slate-50 flex items-center justify-center text-3xl shadow-inner">
              {playerData.selectedAvatar?.iconUrl || "👤"}
            </div>

            <div className="text-center md:text-left">
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-slate-900">
                  {playerData.displayName || playerData.username}
                </h1>
                <span className="text-slate-400 text-sm">
                  @{playerData.username}
                </span>
              </div>

              <div className="flex items-center gap-2 mt-1 text-sm text-slate-600">
                <span className="flex items-center gap-1">
                  {rankInfo.iconUrl} {rankInfo.label}
                </span>

                <span className="flex items-center gap-1">
                  <Globe className="h-4 w-4 text-indigo-500" />
                  Global #{playerData.stats.rank || "---"}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* STATS GRID */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {items.map((item, i) => (
            <Card
              key={i}
              className="p-5 bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all rounded-xl flex flex-row items-center text-center gap-3"
            >
              <div className={`p-3 rounded-xl ${item.bg}`}>{item.icon}</div>

              <div>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                  {item.label}
                </p>
                <p className="text-xl font-black text-slate-900">
                  {item.value}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default PlayerCard;
