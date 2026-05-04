import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Welcome = ({ handleClick }) => {
  return (
    <Card className="relative bg-white/80 backdrop-blur border border-slate-200 shadow-md hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden">
      {/* Background effect */}
      <div className="absolute inset-0 bg-linear-to-br from-slate-100/40 to-transparent pointer-events-none" />

      <div className="relative p-6 md:p-8 flex flex-col text-center items-center gap-6">
        {/* Badge (same style as season) */}
        <div className="bg-linear-to-r from-slate-900 to-slate-700 px-4 py-2 rounded-xl shadow-sm">
          <span className="hidden sm:block font-black text-xl tracking-tighter text-white uppercase">
            Code <span className="text-blue-500">Arena</span>
          </span>
        </div>

        {/* Title */}
        <h1 className="text-4xl font-extrabold text-slate-900 tracking-tight">
          Welcome to CODE <span className="text-blue-500">ARENA</span>
        </h1>

        {/* Description */}
        <p className="text-gray-600 leading-relaxed max-w-xl text-base md:text-lg">
          Challenge developers, improve your coding skills, and climb the
          leaderboard in real-time.
        </p>

        {/* Buttons */}
        <div className="w-full max-w-sm flex gap-4 pt-2">
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

export default Welcome;
