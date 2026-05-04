import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Standard = ({ season, week, handleClick }) => {
  return (
    <Card className="h-full relative bg-white/80 backdrop-blur border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden">
      {/* Background effect */}
      <div className="absolute inset-0 bg-linear-to-br from-slate-100/40 to-transparent pointer-events-none" />

      <div className="relative p-6 md:p-8 flex flex-col gap-6">
        {/* Header */}
        <div className="flex justify-between items-center">
          {/* Week badge */}
          <span className="text-xs font-semibold px-3 py-1 bg-slate-900 text-white rounded-full">
            Week {week}
          </span>

          {/* Season badge */}
          <span className="text-xs font-semibold px-3 py-1 bg-slate-900 text-white rounded-full">
            Season {season}
          </span>
        </div>

        {/* Title */}
        <div>
          <h2>
            <span className="hidden sm:block font-black text-2xl tracking-tighter text-slate-900 uppercase">
              Code <span className="text-blue-500">Arena</span>
            </span>
          </h2>
          <p className="text-sm text-slate-500 mt-2">
            Compete in real-time and prove your coding skills.
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-2">
          <Button
            className="flex-1 bg-white border border-slate-300 hover:bg-slate-100 transition-all duration-200 cursor-pointer"
            variant="outline"
            onClick={() => handleClick("findMatch")}
          >
            Find Match
          </Button>

          <Button
            className="flex-1 bg-slate-900 hover:bg-slate-800 text-white transition-all duration-200 shadow-sm hover:shadow-md cursor-pointer"
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
