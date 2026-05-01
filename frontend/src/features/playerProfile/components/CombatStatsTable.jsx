import { Card } from "@/components/ui/card";

export function CombatStatsTable({ stats }) {
  const technicalStats = [
    {
      label: "Current Streak",
      value: `${stats.currentStreak} WIN`,
      color: "text-emerald-600 font-bold",
    },
    { label: "Best Streak", value: stats.bestStreak },
    { label: "Avg Solve Time", value: `${stats.averageSolveTime} min` },
    { label: "Fastest Solve", value: `${stats.fastestSolveTime}s` },
    { label: "Hardest Win", value: stats.hardestWin },
    { label: "Perfect Runs", value: stats.prefectRuns },
  ];

  return (
    <Card className="bg-white border-slate-200 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-slate-100 bg-slate-50/50">
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-500">
          Technical Performance
        </h3>
      </div>
      <div className="divide-y divide-slate-100">
        {technicalStats.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center px-6 py-4 hover:bg-slate-50/30 transition-colors"
          >
            <span className="text-sm text-slate-500">{item.label}</span>
            <span
              className={`text-sm font-medium ${item.color || "text-slate-900"}`}
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
