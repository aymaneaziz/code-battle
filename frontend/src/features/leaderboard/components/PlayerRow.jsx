import React from "react";
import { TableRow, TableCell } from "@/components/ui/table";
import { Zap } from "lucide-react";

const PlayerRow = ({ player }) => {
  const user = player.user;
  return (
    <TableRow
      key={user?._id}
      className="border-b border-slate-100 hover:bg-blue-50/40 transition-colors duration-150"
    >
      {/* Rank */}
      <TableCell className="p-3 w-1/12">
        <span className="font-bold text-slate-800 text-sm">
          #{player?.currentGlobalRank}
        </span>
      </TableCell>

      {/* Change / Best Rank */}
      <TableCell className="p-3 w-1/12">
        <span className="text-[11px] font-bold text-emerald-600 bg-emerald-50 border border-emerald-200 px-2 py-0.5 rounded-full">
          {player?.bestRank}
        </span>
      </TableCell>

      {/* Player */}
      <TableCell className="py-3 px-3 w-5/12">
        <div className="flex items-center gap-2">
          <span className="text-lg">{user?.selectedAvatar?.iconUrl}</span>
          <span className="font-semibold text-slate-800 text-sm">
            {user?.displayName}
          </span>
        </div>
      </TableCell>

      {/* Tier */}
      <TableCell className="py-3 px-3 w-1/12">
        <div className="flex items-center gap-1 text-sm text-slate-600">
          <span>{player?.currentTier?.iconUrl ?? "-"}</span>
          <span className="text-xs font-medium">
            {player?.currentTier?.label ?? "-"}
          </span>
        </div>
      </TableCell>

      {/* XP — electric blue like navbar */}
      <TableCell className="py-3 px-3 w-1/12">
        <span className="flex items-center gap-1 text-[11px] font-bold px-2 py-0.5 rounded-full  text-blue-600 border border-blue-600 w-fit">
          <Zap size={10} className=" text-blue-600" />
          {user?.stats?.xp ?? 0}
        </span>
      </TableCell>

      {/* Elo */}
      <TableCell className="p-3 w-1/12">
        <span className="text-sm font-bold text-indigo-600">
          {user?.stats?.elo ?? 0}
        </span>
      </TableCell>

      {/* Win-rate */}
      <TableCell className="py-3 px-3 w-1/12">
        <span className="text-sm text-slate-600 font-medium">
          {user?.stats?.winRate
            ? `${parseInt(user.stats.winRate * 100)}%`
            : "-"}
        </span>
      </TableCell>

      {/* Battles */}
      <TableCell className="py-3 px-3 w-1/12">
        <span className="text-sm text-slate-500">
          {user?.stats?.totalMatches ?? 0}
        </span>
      </TableCell>
    </TableRow>
  );
};

export default PlayerRow;
