import React from "react";
import { Card } from "@/components/ui/card";
import { Users, Swords, Activity, Globe } from "lucide-react";

const ServerStats = ({ stats }) => {
  const items = [
    {
      label: "Active Players",
      value: stats.activePlayers,
      icon: <Users className="h-5 w-5 text-blue-500" />,
      bg: "bg-blue-50",
    },
    {
      label: "Battles Today",
      value: stats.battlesToday,
      icon: <Swords className="h-5 w-5 text-rose-500" />,
      bg: "bg-rose-50",
    },
    {
      label: "Live Matches",
      value: stats.liveMaches,
      icon: <Activity className="h-5 w-5 text-orange-500" />,
      bg: "bg-orange-50",
    },
    {
      label: "Total Players",
      value: stats.totalPlayers,
      icon: <Globe className="h-5 w-5 text-indigo-500" />,
      bg: "bg-indigo-50",
    },
  ];

  return (
    <Card className="h-full relative bg-white/80 backdrop-blur border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden p-6">
      {/* background effect */}
      <div className="absolute inset-0 bg-linear-to-br from-slate-100/40 to-transparent pointer-events-none" />

      <div className="relative grid grid-cols-2 md:grid-cols-4 gap-4 h-full items-stretch">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex flex-row items-center justify-center text-center gap-3 p-4 rounded-xl bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all"
          >
            <div className={`p-3 rounded-xl ${item.bg}`}>{item.icon}</div>

            <p className="text-2xl font-extrabold text-slate-900">
              {item.value}
            </p>

            <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
              {item.label}
            </p>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default ServerStats;
