import React from "react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils"; // Make sure you have this shadcn utility

const PlayerCardMatch = ({ user, isOpponent = false }) => {
  if (!user) return <div className="flex-1" />;

  const { displayName, selectedAvatar, rank, stats } = user;
  const avatarEmoji = selectedAvatar?.iconUrl || "⚡";
  const elo = stats?.elo || 99;

  return (
    <div
      className={cn(
        "flex-1 flex items-center gap-4 px-5 py-3 rounded-2xl bg-white border border-slate-200/60 shadow-sm transition-all hover:shadow-md",
        isOpponent ? "flex-row-reverse text-right" : "flex-row text-left",
      )}
    >
      {/* Avatar Container */}
      <div className="relative shrink-0">
        <Avatar className="w-16 h-16 border-4 border-white shadow-sm ring-1 ring-slate-100">
          {/* AvatarFallback is perfect for rendering large text/emojis cleanly */}
          <AvatarFallback className="bg-slate-100 text-3xl select-none">
            {avatarEmoji}
          </AvatarFallback>
        </Avatar>

        {/* Rank Icon Overlay */}
        {rank?.iconUrl && (
          <div
            className={cn(
              "absolute -bottom-1 w-8 h-8 bg-white rounded-full shadow-md border border-slate-100 flex items-center justify-center text-lg z-10",
              isOpponent ? "-left-1" : "-right-1",
            )}
          >
            <span className="leading-none drop-shadow-sm select-none">
              {rank.iconUrl}
            </span>
          </div>
        )}
      </div>

      {/* User Info */}
      <div className="flex flex-col justify-center">
        <h3 className="font-bold text-lg text-slate-800 line-clamp-1 tracking-tight">
          {displayName}
        </h3>
        <div
          className={cn(
            "flex items-center gap-2 mt-1",
            isOpponent ? "justify-end" : "justify-start",
          )}
        >
          <Badge
            variant="secondary"
            className="bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold border border-slate-200/50 shadow-sm"
          >
            {elo} ELO
          </Badge>
          <span className="text-xs text-slate-500 font-semibold uppercase tracking-wider">
            {rank?.label || "Unranked"}
          </span>
        </div>
      </div>
    </div>
  );
};

export default PlayerCardMatch;
