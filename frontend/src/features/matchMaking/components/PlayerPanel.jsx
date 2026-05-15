import { Badge } from "@/components/ui/badge"; // Ensure correct import for UI Badge
import { getRankConfig } from "../services/rankConfig";

export const PlayerPanel = ({ player, label }) => {
  const config = getRankConfig(player?.rank?.label);

  const rankIcon = player?.rank?.iconUrl || config.icon;

  return (
    <div className="flex flex-col items-center gap-4 flex-1">
      <p className="text-xs uppercase tracking-widest font-bold text-slate-400">
        {label}
      </p>

      {/* Avatar */}
      <div
        className={`w-24 h-24 rounded-2xl border-4 ${config.borderColor} bg-white flex items-center justify-center text-5xl shadow-md transition-all`}
      >
        {player?.selectedAvatar?.iconUrl ?? "🧑‍💻"}
      </div>

      {/* Display name */}
      <p className="text-xl font-black tracking-tight text-slate-900">
        {player?.displayName ?? "Unknown"}
      </p>

      {/* Rank badge using dynamic iconUrl */}
      <span
        className={`text-xs font-bold px-3 py-1 rounded-full flex items-center gap-2 ${config.bgColor} ${config.color}`}
      >
        <span className="text-sm">{rankIcon}</span>
        {player?.rank?.label || config.label}
      </span>

      {/* ELO */}
      <p className="text-slate-500 text-sm">
        ELO:{" "}
        <span className="font-bold text-slate-700">
          {player?.stats?.elo ?? "—"}
        </span>
      </p>

      {/* Stats row */}
      <div className="flex gap-4 text-center">
        <div>
          <p className="text-xs text-slate-400">W</p>
          <p className="font-bold text-slate-700">{player?.stats?.wins ?? 0}</p>
        </div>
        <div>
          <p className="text-xs text-slate-400">L</p>
          <p className="font-bold text-slate-700">
            {player?.stats?.losses ?? 0}
          </p>
        </div>
        <div>
          <p className="text-xs text-slate-400">LVL</p>
          <p className="font-bold text-slate-700">
            {player?.stats?.level ?? 1}
          </p>
        </div>
      </div>

      {/* Badges */}
      {player?.badgesPlayer?.length > 0 && (
        <div className="flex gap-1 flex-wrap justify-center mt-2">
          {player.badgesPlayer.map((badge, i) => (
            <Badge
              key={i}
              variant="secondary"
              className="text-[10px] gap-1 px-2 py-0"
              title={badge.rarity}
            >
              {badge.iconUrl} {badge.name}
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
};
