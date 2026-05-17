import { Swords, Clock } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { HpBar } from "./HpBar";
import { ComboDisplay } from "./ComboDisplay";

// ── Stat mini-bar ─────────────────────────────────────────────────────────────
const StatBar = ({ label, value, color, flip = false }) => (
  <div className={`flex items-center gap-2 ${flip ? "flex-row-reverse" : ""}`}>
    <span className="text-[9px] font-black text-slate-400 uppercase tracking-wider w-6 shrink-0 text-center">
      {label}
    </span>
    <div className="flex-1 h-1.5 bg-slate-100 rounded-full overflow-hidden">
      <div
        className={`h-full rounded-full transition-all duration-500 ${color}`}
        style={{ width: `${Math.min(100, Math.max(0, value))}%` }}
      />
    </div>
    <span className="text-[9px] font-black text-slate-500 w-5 text-right">
      {value}
    </span>
  </div>
);

// ── Player panel ──────────────────────────────────────────────────────────────
const PlayerPanel = ({ user, hp, flip = false }) => {
  if (!user) return <div className="flex-1" />;

  const { displayName, selectedAvatar, rank, stats } = user;
  const avatarEmoji = selectedAvatar?.iconUrl ?? "⚡";
  const elo = stats?.elo ?? 400;

  return (
    <div
      className={`flex-1 flex flex-col gap-2 min-w-0 ${flip ? "items-end" : "items-start"}`}
    >
      {/* Avatar + name row */}
      <div
        className={`flex items-center gap-3 w-full ${flip ? "flex-row-reverse" : ""}`}
      >
        <div className="relative shrink-0">
          <Avatar className="w-12 h-12 border-2 border-white shadow ring-1 ring-slate-100">
            <AvatarFallback className="bg-indigo-50 text-2xl select-none">
              {avatarEmoji}
            </AvatarFallback>
          </Avatar>
          {rank?.iconUrl && (
            <div
              className={cn(
                "absolute -bottom-1 w-6 h-6 bg-white rounded-full shadow border border-slate-100 flex items-center justify-center text-sm z-10",
                flip ? "-left-1" : "-right-1",
              )}
            >
              <span className="leading-none select-none">{rank.iconUrl}</span>
            </div>
          )}
        </div>

        <div
          className={`flex flex-col min-w-0 ${flip ? "items-end" : "items-start"}`}
        >
          <p className="text-sm font-black text-slate-800 leading-none truncate max-w-32">
            {displayName}
          </p>
          <div className="flex items-center gap-1.5 mt-0.5">
            <Badge
              variant="secondary"
              className="text-[10px] font-bold px-1.5 py-0 bg-slate-100 text-slate-600"
            >
              {elo} ELO
            </Badge>
            <span className="text-[10px] text-slate-400 font-semibold uppercase tracking-wider">
              {rank?.label ?? "Unranked"}
            </span>
          </div>
        </div>
      </div>

      {/* HP bar */}
      <div className="w-full">
        <HpBar hp={hp} max={100} flip={flip} />
      </div>

      {/* Mini stat bars */}
      <div className="w-full flex flex-col gap-0.5">
        <StatBar
          label="WIN"
          value={Math.round(stats?.winRate * 100) ?? 0}
          color="bg-blue-400"
          flip={flip}
        />
        <StatBar
          label="STK"
          value={Math.min(stats?.currentStreak ?? 0, 100)}
          color="bg-orange-400"
          flip={flip}
        />
      </div>
    </div>
  );
};

// ── Center block ──────────────────────────────────────────────────────────────
const CenterBlock = ({ minutes, seconds, problem, combo, isLow }) => {
  const pad = (n) => String(n).padStart(2, "0");

  return (
    <div className="flex flex-col items-center gap-2 shrink-0 px-4 min-w-48">
      {/* VS */}
      <div className="flex items-center gap-2">
        <Swords size={16} className="text-indigo-400" />
        <span className="text-lg font-black text-slate-300 tracking-tighter">
          VS
        </span>
        <Swords size={16} className="text-indigo-400 scale-x-[-1]" />
      </div>

      {/* Timer */}
      <div
        className={`flex items-center gap-1.5 bg-white border rounded-xl px-5 py-2 shadow-sm
        ${isLow ? "border-red-200 bg-red-50" : "border-slate-200"}`}
      >
        <Clock
          size={12}
          className={isLow ? "text-red-400 animate-pulse" : "text-slate-400"}
        />
        <span
          className={`text-xl font-mono font-black tabular-nums
          ${isLow ? "text-red-500 animate-pulse" : "text-slate-800"}`}
        >
          {pad(minutes)}:{pad(seconds)}
        </span>
      </div>

      {/* Problem badge */}
      {problem && (
        <div className="flex flex-col items-center gap-1">
          <p className="text-[9px] uppercase font-bold text-slate-400 tracking-widest">
            Challenge
          </p>
          <p className="text-[11px] font-black text-slate-700 text-center leading-tight max-w-36 truncate">
            {problem.title}
          </p>
          <Badge
            variant="outline"
            className={`text-[9px] font-bold px-2 py-0 ${
              problem.difficulty === "Easy"
                ? "text-green-600 border-green-200 bg-green-50"
                : problem.difficulty === "Medium"
                  ? "text-yellow-600 border-yellow-200 bg-yellow-50"
                  : problem.difficulty === "Hard"
                    ? "text-orange-600 border-orange-200 bg-orange-50"
                    : "text-red-600 border-red-200 bg-red-50"
            }`}
          >
            {problem.difficulty}
          </Badge>
        </div>
      )}

      {/* Combo */}
      <ComboDisplay combo={combo} />
    </div>
  );
};

// ── MatchHeader ────────────────────────────────────────────────────
export function MatchHeader({
  you,
  opponent,
  myHp,
  opponentHp,
  myCombo,
  minutes,
  seconds,
  problem,
}) {
  const isLow = minutes === 0 && seconds <= 30;

  return (
    <div className="flex-none w-full bg-white border-b border-slate-200 shadow-sm px-4 py-3">
      <div className="flex items-center gap-4 max-w-7xl mx-auto">
        <PlayerPanel user={you} hp={myHp} flip={false} />
        <CenterBlock
          minutes={minutes}
          seconds={seconds}
          problem={problem}
          combo={myCombo}
          isLow={isLow}
        />
        <PlayerPanel user={opponent} hp={opponentHp} flip={true} />
      </div>
    </div>
  );
}
