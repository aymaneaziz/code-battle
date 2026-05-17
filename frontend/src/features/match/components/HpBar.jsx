export function HpBar({ hp = 100, max = 100, flip = false }) {
  const pct = Math.max(0, Math.min(100, (hp / max) * 100));

  const barColor =
    pct > 60 ? "bg-green-500" : pct > 30 ? "bg-yellow-400" : "bg-red-500";

  const glowColor =
    pct > 60
      ? "shadow-green-400/50"
      : pct > 30
        ? "shadow-yellow-400/50"
        : "shadow-red-500/60";

  return (
    <div className="w-full flex flex-col gap-1">
      <div
        className={`flex items-center justify-between text-[9px] font-black text-slate-400 ${flip ? "flex-row-reverse" : ""}`}
      >
        <span>HP</span>
        <span className={pct <= 30 ? "text-red-500 animate-pulse" : ""}>
          {Math.max(0, Math.round(hp))}/{max}
        </span>
      </div>

      {/* Track */}
      <div
        className={`w-full h-3 bg-slate-200 rounded-full overflow-hidden ${flip ? "scale-x-[-1]" : ""}`}
      >
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out shadow-sm ${barColor} ${pct <= 30 ? `shadow-lg ${glowColor}` : ""}`}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
