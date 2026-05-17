import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Shield, Calendar, Globe } from "lucide-react"; // Added Calendar
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";
import { usePlayerStatus } from "@/hooks/usePlayerStatus";

export function ProfileHeader({ identity, rankInfo }) {
  // Hna bach nriglo l format d createdAt
  const joinDate = identity.createdAt
    ? new Date(identity.createdAt).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "Recently joined";

  const { rank, elo, level, globalRank } = rankInfo;

  const displayId = identity.userId?.replace(/^user_/, "") || "";

  const safeRank = rank || {
    label: "Unranked",
    iconUrl: "⚪",
    minElo: 0,
    maxElo: 1000,
  };
  const isOnline = usePlayerStatus(identity.userId);

  const min = safeRank.minElo;
  const hasNextRank = safeRank.maxElo < 9999;
  const max = hasNextRank ? safeRank.maxElo : Number.MAX_SAFE_INTEGER;
  const range = max - min;
  const progressToNextRank =
    hasNextRank && range > 0 ? ((elo - min) / range) * 100 : 100;

  const clampProgress = (value) => Math.min(100, Math.max(0, value));
  const eloToNext = hasNextRank ? max - elo + 1 : 0;

  return (
    <Card className="bg-white border-slate-200 shadow-sm overflow-hidden">
      <div className="p-6 md:p-4 flex flex-col md:flex-row gap-6 items-center">
        {/* Avatar */}
        <div className="relative pl-5">
          <div className="h-24 w-24 rounded-full border border-slate-100 bg-slate-50 flex items-center justify-center text-4xl shadow-sm">
            {identity.avatar?.iconUrl || "👤"}
          </div>
          <div
            className={cn(
              "absolute bottom-1 right-1 h-5 w-5 rounded-full border-4 border-white shadow-sm",
              isOnline ? "bg-emerald-500 animate-pulse" : "bg-slate-300",
            )}
          />
        </div>

        <div className="flex-1 text-center md:text-left">
          <div>
            <div className="flex items-center gap-3">
              <h1 className="text-2xl font-bold text-slate-900 tracking-tight">
                {identity.displayName || identity.username}
              </h1>
              {displayId && (
                <Badge
                  variant="outline"
                  className="text-[15px] font-mono text-slate-500 bg-slate-50 border-slate-400"
                >
                  #{displayId}
                </Badge>
              )}
            </div>
            <p className="text-slate-500 text-sm mt-0.5">
              @{identity.username}
            </p>
          </div>

          <p className="text-slate-900 text-sm leading-relaxed max-w-md m-2">
            {identity.bio || "No bio yet."}
          </p>
          <div className="flex flex-wrap gap-4 text-xs font-medium text-slate-500">
            <div className="flex items-center gap-1.5">
              <MapPin size={14} className="text-slate-400" />{" "}
              {identity.location || "Morocco"}
            </div>
            {/* JOINED DATE  */}
            <div className="group relative flex items-center gap-1 cursor-pointer hover:text-slate-600 transition-colors">
              <Calendar size={14} />
              <span>Joined</span>
              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                {joinDate}
              </div>
            </div>
          </div>
        </div>

        {/* Right: Rank Card (Game Style) */}

        <div className="w-full md:w-lg bg-slate-50 px-6 py-3 rounded-xl border border-slate-100 shadow-inner group transition-all duration-300">
          <div className="flex justify-between items-start mb-4">
            <div>
              <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.2em] mb-1">
                Current Rank
              </p>
              <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2 group-hover:text-indigo-700 transition-colors">
                {safeRank.label}{" "}
                <span className="text-2xl">{safeRank.iconUrl}</span>
              </h2>
            </div>
            <div className="text-right">
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                ELO
              </p>
              <p className="text-2xl font-black text-slate-950">{elo}</p>
            </div>
          </div>

          {/* Rank Progress Bar - RPG Style */}
          <div className="space-y-2 relative">
            <Progress
              value={clampProgress(progressToNextRank)}
              className="h-2 bg-slate-200 border border-slate-100 shadow-inner relative overflow-hidden"
              indicatorClassName="bg-gradient-to-r from-blue-500 to-indigo-400"
            />
            <div className="flex justify-between items-center text-[9px] font-bold uppercase tracking-tighter text-slate-500">
              <span>{min} ELO</span>
              <span
                className={cn("font-black tracking-widest text-indigo-500")}
              >
                {hasNextRank
                  ? `${eloToNext} ELO to Rank Up`
                  : "Max Rank Achieved"}
              </span>
              <span>{max !== Number.MAX_SAFE_INTEGER ? `${max} ELO` : ""}</span>
            </div>
            {/* Progress Percentage - RPG Style Overlay */}
            <div className="absolute top-0 right-0 -translate-y-1/2 flex items-center gap-1.5 text-[9px] font-black text-slate-900 bg-white px-2 py-0.5 rounded-full border border-slate-200 shadow-sm z-10">
              {hasNextRank
                ? `${clampProgress(progressToNextRank).toFixed(0)}%`
                : "👑"}
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
}
