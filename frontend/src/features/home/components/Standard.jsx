import React, { useEffect, useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import wsClient from "@/service/wsClient";
import { useNavigate } from "react-router-dom";

const Standard = ({ season, week, handleClick, player }) => {
  const navigate = useNavigate();

  const { playerInfo } = player;
  console.log("Player info :", player);

  // Handle the "Find Match" button click
  const handleFindMatch = () => {
    if (!playerInfo) return;

    wsClient.send({
      type: "JOIN_QUEUE",
      userId: playerInfo.userId,
      displayName: playerInfo.displayName,
      elo: playerInfo.stats?.elo,
    });
    navigate("/matchmaking", { state: { fromStandard: true } });
  };

  return (
    <Card className="h-full relative bg-white border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl overflow-hidden">
      {/* Subtle background effect */}
      <div className="absolute inset-0 bg-linear-to-br from-slate-50 to-transparent pointer-events-none" />

      <div className="relative p-6 md:p-8 flex flex-col justify-between h-full gap-6">
        {/* Header Badges */}
        <div className="flex justify-between items-center">
          <span className="text-[10px] uppercase tracking-widest font-bold px-3 py-1 bg-slate-900 text-white rounded-lg">
            Week {week}
          </span>
          <span className="text-[10px] uppercase tracking-widest font-bold px-3 py-1 bg-slate-900 text-white rounded-lg">
            Season {season}
          </span>
        </div>

        {/* Title + Logo Section */}
        <div className="flex flex-col gap-3">
          <div className="flex items-center gap-3">
            <h2 className="leading-none">
              <span className="font-black text-2xl tracking-tighter text-slate-900 uppercase">
                Code <span className="text-blue-500">Arena</span>
              </span>
            </h2>
          </div>

          <p className="text-sm text-slate-500 leading-relaxed">
            Compete in real-time matches, climb the ranks, and prove your
            competitive skills.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-4 mt-2">
          <Button
            onClick={handleFindMatch}
            disabled={!playerInfo}
            className="flex-1 bg-indigo-600 hover:bg-indigo-700 text-white font-bold transition-all duration-200 cursor-pointer"
          >
            Find Match
          </Button>

          <Button
            className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-bold transition-all duration-200 shadow-sm cursor-pointer border-none"
            onClick={() => handleClick("Practice")}
          >
            Practice
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default Standard;
