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
    <ScrollArea className="h-96 rounded-2xl">
      <Table className="w-full">
        <TableHeader className="bg-slate-50 border-b border-slate-200 sticky top-0">
          <TableRow className="hover:bg-slate-50">
            <TableHead className="font-bold text-slate-400 uppercase text-[11px] tracking-widest text-left w-1/12 px-3 py-3">
              Rank
            </TableHead>
            <TableHead className="font-bold text-slate-400 uppercase text-[11px] tracking-widest text-left w-1/12 px-3">
              Best
            </TableHead>
            <TableHead className="font-bold text-slate-400 uppercase text-[11px] tracking-widest text-left w-5/12 px-3">
              Player
            </TableHead>
            <TableHead className="font-bold text-slate-400 uppercase text-[11px] tracking-widest text-left w-1/12 px-3">
              Tier
            </TableHead>
            <TableHead className="font-bold text-slate-400 uppercase text-[11px] tracking-widest text-left w-1/12 px-3">
              XP
            </TableHead>
            <TableHead className="font-bold text-slate-400 uppercase text-[11px] tracking-widest text-left w-1/12 px-3">
              Elo
            </TableHead>
            <TableHead className="font-bold text-slate-400 uppercase text-[11px] tracking-widest text-left w-1/12 px-3">
              Win %
            </TableHead>
            <TableHead className="font-bold text-slate-400 uppercase text-[11px] tracking-widest text-left w-1/12 px-3">
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
