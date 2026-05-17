import React from "react";
import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ScrollArea } from "@/components/ui/scroll-area";

import PlayerRow from "./PlayerRow";

const GlobalRank = ({ data }) => {
  return (
    <ScrollArea className="h-96 rounded-md border">
      <Table className="w-full">
        <TableHeader className="bg-slate-50/80 w-full">
          <TableRow className="w-full">
            <TableHead className="font-bold text-slate-500 uppercase text-xs text-left w-1/12">
              Rank
            </TableHead>
            <TableHead className="font-bold text-slate-500 uppercase text-xs text-left w-1/12">
              Best-Rank
            </TableHead>
            <TableHead className="font-bold text-slate-500 uppercase text-xs text-left w-5/12">
              Player
            </TableHead>
            <TableHead className="font-bold text-slate-500 uppercase text-xs text-left w-1/12">
              Tier
            </TableHead>
            <TableHead className="font-bold text-slate-500 uppercase text-xs text-left w-1/12">
              XP
            </TableHead>
            <TableHead className="font-bold text-slate-500 uppercase text-xs text-left w-1/12">
              Elo
            </TableHead>
            <TableHead className="font-bold text-slate-500 uppercase text-xs text-left w-1/12">
              Win-rate
            </TableHead>
            <TableHead className="font-bold text-slate-500 uppercase text-xs text-left w-1/12">
              Battles
            </TableHead>
          </TableRow>
        </TableHeader>

        {/* BODY */}
        <TableBody>
          {data?.map((player) => (
            <PlayerRow key={player?.user?._id} player={player} />
          ))}
        </TableBody>
      </Table>
    </ScrollArea>
  );
};
export default GlobalRank;
