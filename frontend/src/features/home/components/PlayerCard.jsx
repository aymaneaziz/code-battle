import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import {
  Trophy,
  Zap,
  Target,
  Flame,
  Globe,
  Shield,
  Pointer,
  Pickaxe,
  ArrowBigUpDash,
} from "lucide-react";
import { usePlayerStatus } from "@/hooks/usePlayerStatus";
import { cn } from "@/lib/utils";

const PlayerCard = ({ player }) => {
  // bla madir useState lprops, khdem bihom direct bach teviter re renders zaydine
  const { playerInfo, rank, level } = player;
  const stats = playerInfo?.stats || {};
  const isOnline = usePlayerStatus(playerInfo.userId);

  const statItems = [
    {
      label: "Win Rate",
      value: `${Math.round(stats.winRate * 100) || 0}%`,
      icon: <Target className="h-5 w-5 text-rose-500" />,
      bg: "bg-rose-50",
    },
    {
      label: "Total XP",
      value: stats.xp?.toLocaleString() || 0,
      icon: <Zap className="h-5 w-5 text-blue-500" />,
      bg: "bg-blue-50",
    },
    {
      label: "Matches",
      value: stats.totalMatches || 0,
      icon: <Trophy className="h-5 w-5 text-orange-500" />,
      bg: "bg-orange-50",
    },
    {
      label: "Current Streak",
      value: `x${stats.currentStreak || 0}`,
      icon: <Flame className="h-5 w-5 text-red-500" />,
      bg: "bg-red-50",
    },
  ];

  return (
    <Card className="relative bg-white border-slate-200 shadow-sm hover:shadow-md transition-all rounded-2xl p-6 overflow-hidden">
      <div className="relative z-10 flex flex-col gap-6">
        {/* Header: Avatar o Smya */}
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="h-16 w-16 rounded-2xl bg-slate-100 flex items-center justify-center text-3xl shadow-inner border border-slate-200">
              {playerInfo.selectedAvatar?.iconUrl || "👤"}
            </div>

            {/* Real-time Status Indicator */}
            <span className="absolute -bottom-1 -right-1 flex h-4 w-4">
              <span
                className={cn(
                  "relative inline-flex rounded-full h-4 w-4 border-2 border-white shadow-sm",
                  isOnline ? "bg-green-500 animate-pulse" : "bg-slate-300",
                )}
              />
            </span>
          </div>
          <div>
            <h1 className="text-lg font-bold text-slate-900 leading-tight">
              {playerInfo.displayName || playerInfo.username}
            </h1>

            <div className="flex flex-wrap items-center gap-3 mt-1.5">
              {/* Rank Info */}
              <span className="flex items-center gap-1 text-sm font-medium text-slate-600">
                {rank?.iconUrl} {rank?.label || "Unranked"}
              </span>
              {/* Level Badge */}
              <div className="flex items-center gap-1 text-indigo-600 font-bold text-[11px]  uppercase  bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-300">
                <ArrowBigUpDash className="h-4 w-4" />
                {stats?.elo || 1} ELO
              </div>
              {/* Global Rank */}
              <span className="flex items-center gap-1 text-[12px] font-bold text-indigo-600  bg-indigo-50 px-2 py-0.5 rounded-md border border-indigo-300">
                <Globe className="h-3.5 w-3.5" />
                Rank #{stats.globalRank || "---"}
              </span>
            </div>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          {statItems.map((item, i) => (
            <div
              key={i}
              className="p-4 bg-slate-50/50 border border-slate-100 rounded-xl flex items-center gap-3"
            >
              <div className={`p-2 rounded-lg ${item.bg}`}>{item.icon}</div>
              <div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                  {item.label}
                </p>
                <p className="text-lg font-black text-slate-800">
                  {item.value}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
};

export default PlayerCard;
