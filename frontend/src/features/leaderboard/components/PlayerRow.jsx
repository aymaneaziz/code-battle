import React from "react";
import { TableRow, TableCell } from "@/components/ui/table";

const PlayerRow = ({ player }) => {
  const user = player.user;
  return (
    <TableRow
      key={user?._id}
      className="border-b hover:bg-zinc-50 TableRowansition"
    >
      {/* Rank */}
      <TableCell className="p-2 font-medium w-1/12">
        #{player?.currentGlobalRank}
      </TableCell>

      {/* Change */}
      <TableCell className="p-2 text-green-500 w-1/12">
        {player?.bestRank}
      </TableCell>

      {/* Player */}
      <TableCell className="py-4 text-slate-500 w-5/12">
        {user?.selectedAvatar?.iconUrl}
        <span className="font-medium">{user?.displayName}</span>
      </TableCell>

      {/* Tier */}
      <TableCell className="py-4 text-slate-500 w-1/12">
        {player?.currentTier?.iconUrl ?? "-"}
        {player?.currentTier?.label ?? "-"}
      </TableCell>

      {/* XP */}
      <TableCell className="py-4 text-slate-500 w-1/12">
        {user?.stats?.xp ?? 0}
      </TableCell>

      {/* Elo */}
      <TableCell className="p-2 font-semibold text-blue-600 w-1/12">
        {user?.stats?.elo ?? 0}
      </TableCell>

      {/* Win-rate */}
      <TableCell className="py-4 text-slate-500 w-1/12">
        {user?.stats?.winRate ? `${parseInt(user.stats.winRate * 100)}%` : "-"}
      </TableCell>

      {/* Battles */}
      <TableCell className="py-4 text-slate-500 w-1/12">
        {user?.stats?.totalMatches ?? 0}
      </TableCell>
    </TableRow>
  );
};

export default PlayerRow;
