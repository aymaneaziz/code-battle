import { useEffect, useState } from "react";
import { useAuth } from "@clerk/clerk-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import {
  Trophy,
  Skull,
  Handshake,
  TrendingUp,
  TrendingDown,
  Minus,
  Clock,
  Coins,
  Gem,
  Swords,
  FlaskConical,
} from "lucide-react";
import { fetchMatchHistory } from "../services/profileApi";

// ── Helpers ───────────────────────────────────────────────────────────────────

const formatSolveTime = (ms) => {
  if (ms == null) return "—";
  const totalSeconds = Math.floor(ms / 1000);
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return m > 0 ? `${m}m ${String(s).padStart(2, "0")}s` : `${s}s`;
};

const REASON_LABEL = {
  all_tests_passed: "All tests passed",
  hp_zero: "HP depleted",
  time_expired: "Time expired",
  surrender: "Surrender",
};

const DIFFICULTY_COLOR = {
  Easy: "text-green-600 bg-green-50 border-green-200",
  Medium: "text-yellow-600 bg-yellow-50 border-yellow-200",
  Hard: "text-orange-600 bg-orange-50 border-orange-200",
  Extreme: "text-red-600 bg-red-50 border-red-200",
};

// ── Single match row ──────────────────────────────────────────────────────────
const MatchRow = ({ match }) => {
  const isWin = match.outcome === "win";
  const isLoss = match.outcome === "loss";
  const isDraw = match.outcome === "draw";

  const OutcomeIcon = isWin ? Trophy : isLoss ? Skull : Handshake;
  const EloDeltaIcon =
    match.eleDelta > 0 ? TrendingUp : match.eleDelta < 0 ? TrendingDown : Minus;

  const rowBg = isWin
    ? "bg-green-50/50 border-green-100"
    : isLoss
      ? "bg-red-50/40 border-red-100"
      : "bg-slate-50 border-slate-100";

  const outcomeColor = isWin
    ? "text-green-600"
    : isLoss
      ? "text-red-500"
      : "text-slate-500";

  const eloColor =
    (match.eleDelta ?? 0) >= 0 ? "text-green-600" : "text-red-500";

  return (
    <div
      className={`flex items-center gap-3 px-4 py-3 rounded-xl border transition-colors ${rowBg}`}
    >
      {/* Outcome icon */}
      <div className={`shrink-0 ${outcomeColor}`}>
        <OutcomeIcon size={18} />
      </div>

      {/* Problem + opponent */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 flex-wrap">
          <p className="text-xs font-black text-slate-800 truncate">
            {match.problemTitle ?? "Unknown Problem"}
          </p>
          {match.difficulty && (
            <Badge
              variant="outline"
              className={`text-[9px] font-bold px-1.5 py-0 ${DIFFICULTY_COLOR[match.difficulty] ?? ""}`}
            >
              {match.difficulty}
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-1.5 mt-0.5">
          <Swords size={9} className="text-slate-400 shrink-0" />
          <span className="text-[10px] text-slate-500 font-medium truncate">
            vs {match.opponent?.displayName ?? "Unknown"}
          </span>
          <span className="text-[10px] text-slate-300">·</span>
          <span className="text-[10px] text-slate-400">
            {REASON_LABEL[match.reason] ?? match.reason}
          </span>
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-3 shrink-0 flex-wrap justify-end">
        {/* Solve time */}
        {match.solveTimeMs != null && (
          <div className="flex items-center gap-1 text-[10px] text-slate-500">
            <Clock size={10} />
            <span>{formatSolveTime(match.solveTimeMs)}</span>
          </div>
        )}

        {/* Tests */}
        <div className="flex items-center gap-1 text-[10px] text-slate-500">
          <FlaskConical size={10} />
          <span>{match.testsPassed ?? 0} passed</span>
        </div>

        {/* ELO delta */}
        <div
          className={`flex items-center gap-1 text-[10px] font-black ${eloColor}`}
        >
          <EloDeltaIcon size={10} />
          <span>
            {(match.eleDelta ?? 0) >= 0 ? "+" : ""}
            {match.eleDelta ?? 0}
          </span>
        </div>

        {/* Coins */}
        {match.coinsEarned > 0 && (
          <div className="flex items-center gap-0.5 text-[10px] font-bold text-amber-600">
            <Coins size={10} />
            <span>+{match.coinsEarned}</span>
          </div>
        )}

        {/* Gems */}
        {match.gemsEarned > 0 && (
          <div className="flex items-center gap-0.5 text-[10px] font-bold text-indigo-600">
            <Gem size={10} />
            <span>+{match.gemsEarned}</span>
          </div>
        )}

        {/* Date */}
        <span className="text-[10px] text-slate-300 hidden sm:block">
          {new Date(match.playedAt).toLocaleDateString()}
        </span>
      </div>
    </div>
  );
};

// ── Section ───────────────────────────────────────────────────────────────────
export function MatchHistorySection() {
  const { getToken } = useAuth();
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    getToken().then(async (token) => {
      try {
        const data = await fetchMatchHistory(token);
        if (!cancelled) setHistory(data ?? []);
      } catch {
        // silently fail — history is non-critical
      } finally {
        if (!cancelled) setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [getToken]);

  // ── Header stats ──────────────────────────────────────────────────────────
  const wins = history.filter((h) => h.outcome === "win").length;
  const losses = history.filter((h) => h.outcome === "loss").length;
  const draws = history.filter((h) => h.outcome === "draw").length;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
      {/* Header */}
      <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
        <div>
          <div className=" py-2 border-b border-slate-50">
            <h3 className="text-xs font-bold uppercase tracking-widest text-slate-800">
              Match History
            </h3>
          </div>
          <p className="text-[10px] text-slate-400 font-medium mt-0.5">
            Last {history.length} matches
          </p>
        </div>

        {!loading && history.length > 0 && (
          <div className="flex items-center gap-2 text-[10px] font-black">
            <span className="text-green-600 bg-green-50 border border-green-200 px-2 py-0.5 rounded-md">
              {wins}W
            </span>
            <span className="text-red-500 bg-red-50 border border-red-100 px-2 py-0.5 rounded-md">
              {losses}L
            </span>
            <span className="text-slate-500 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded-md">
              {draws}D
            </span>
          </div>
        )}
      </div>

      {/* Body */}
      {loading ? (
        <div className="flex items-center justify-center py-10">
          <div className="w-5 h-5 border-2 border-slate-200 border-t-indigo-500 rounded-full animate-spin" />
        </div>
      ) : history.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-12 text-slate-400 gap-2">
          <Swords size={28} className="opacity-20" />
          <p className="text-xs italic">No matches played yet.</p>
        </div>
      ) : (
        <ScrollArea className="h-96">
          <div className="flex flex-col gap-2 p-4">
            {history.map((match) => (
              <MatchRow
                key={match.matchHistoryId ?? match.matchId}
                match={match}
              />
            ))}
          </div>
        </ScrollArea>
      )}
    </div>
  );
}
