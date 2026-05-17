import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
const formatDuration = (ms) => {
  if (!ms) return "—";
  const totalSeconds = Math.floor(ms / 1000);
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${m}m ${String(s).padStart(2, "0")}s`;
};

// ─── Difficulty badge ─────────────────────────────────────────────────────────
const DIFFICULTY_STYLES = {
  Easy: "bg-green-100  text-green-700  border-green-200  hover:bg-green-100",
  Medium: "bg-yellow-100 text-yellow-700 border-yellow-200 hover:bg-yellow-100",
  Hard: "bg-red-100    text-red-700    border-red-200    hover:bg-red-100",
  Extreme:
    "bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-100",
};

const DifficultyBadge = ({ difficulty }) => (
  <Badge
    variant="outline"
    className={`font-semibold ${DIFFICULTY_STYLES[difficulty] ?? DIFFICULTY_STYLES.Easy}`}
  >
    {difficulty}
  </Badge>
);

export function CombatStatsTable({ stats }) {
  // On organise les stats pour éviter les doublons et formater les labels
  const technicalStats = [
    {
      label: "Current Streak",
      value: `${stats.currentStreak} WIN`,
      className:
        "text-emerald-600 font-bold bg-emerald-50 px-2 py-0.5 rounded text-[12px]",
    },
    { label: "Best Streak Ever", value: `x${stats.bestStreak || 0}` },
    {
      label: "Avg Solve Time",
      value: stats.averageSolveTime
        ? `${formatDuration(stats.averageSolveTime)}`
        : "--:--",
    },
    {
      label: "Fastest Solve",
      value: stats.fastestSolveTime
        ? `${formatDuration(stats.fastestSolveTime)}`
        : "--:--",
    },
    {
      label: "Hardest Win",
      value: <DifficultyBadge difficulty={stats.hardestWin} /> || "None",
      className:
        stats.hardestWin === "EXTREME" ? "text-orange-600 font-bold" : "",
    },
    { label: "Perfect Runs (no hints)", value: stats.prefectRuns || 0 },
    { label: "Items Used", value: stats.itemsUsed || 0 },
    { label: "Hints Used", value: stats.hintUsed || 0 },
  ];

  return (
    <Card className="bg-white border-slate-200 shadow-sm overflow-hidden">
      {/* Header simple avec un double slash comme dans ton wireframe // */}
      <div className="px-6 py-5 border-b border-slate-50">
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-800">
          Combat Stats
        </h3>
      </div>

      <div className="divide-y divide-slate-50 px-2">
        {technicalStats.map((item, index) => (
          <div
            key={index}
            className="flex justify-between items-center px-4 py-3.5 hover:bg-slate-50/50 transition-colors group"
          >
            <span className="text-sm font-medium text-slate-500 group-hover:text-slate-700 transition-colors">
              {item.label}
            </span>
            <span
              className={cn(
                "text-sm font-semibold text-slate-900",
                item.className,
              )}
            >
              {item.value}
            </span>
          </div>
        ))}
      </div>
    </Card>
  );
}
