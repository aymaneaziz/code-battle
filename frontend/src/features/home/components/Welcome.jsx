import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import codeArenaArch from "../../../assets/Code-ArenaBig.png";

const Welcome = ({ handleClick }) => {
  return (
    <Card className="relative bg-white border border-slate-200 shadow-sm rounded-3xl overflow-hidden">
      <div className="flex flex-col items-center text-center  gap-5 pb-10">
        {/* BIG LOGO */}
        <img
          src={codeArenaArch}
          alt="Code Arena"
          className="w-92 h-92 object-contain -mt-12 -mb-18 "
        />

        <h1 className="text-4xl md:text-5xl font-black text-slate-900 tracking-[-0.05em] uppercase leading-tight">
          Welcome to Code <span className="text-blue-500">Arena</span>
        </h1>

        <p className="text-slate-500 leading-relaxed max-w-105 text-base">
          Challenge developers, improve your coding skills, and climb the
          leaderboard in real-time.
        </p>

        <div className="flex gap-4 w-full max-w-sm pt-2">
          <Button
            variant="outline"
            className="flex-1 border-slate-200 text-slate-900 hover:bg-slate-50 cursor-pointer"
            onClick={() => handleClick("findMatch")}
          >
            Find Match
          </Button>
          <Button
            className="flex-1 bg-slate-900 hover:bg-slate-800 text-white font-bold border-none cursor-pointer"
            onClick={() => handleClick("Practice")}
          >
            Practice
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default Welcome;
