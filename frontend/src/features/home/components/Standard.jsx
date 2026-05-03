import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Standard = ({ season, week }) => {
  return (
    <Card className="bg-white border-slate-200 shadow-sm overflow-hidden">
      <div className="p-6 md:p-8 flex flex-col gap-6 items-left">
        <div className="flex flex-row bg-slate-50 px-6 py-4 rounded-xl border border-slate-100 justify-between">
          <div className="flex flex-row text-center justify-center items-center">
            <p className="text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-1">
              Season:
            </p>
            <p className="text-3xl font-black text-slate-900">{season}</p>
          </div>
          <div className="flex flex-row text-center justify-center items-center gap-1">
            <p className="text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-1">
              Week:
            </p>
            <p className="text-3xl font-black text-slate-900">{week}</p>
          </div>
        </div>
        <h2 className="text-2xl font-bold text-slate-900">Code</h2>
        <h2 className="text-2xl font-bold text-slate-900">Battle</h2>
        <h2 className="text-2xl font-bold text-slate-900">Conquer</h2>
        <div className="flex justify-between items-center">
          <Button className="bg-white cursor-pointer" variant="outline">
            findMatch
          </Button>
          <Button className="bg-slate-900  hover:bg-slate-800 text-white cursor-pointer">
            Practice
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default Standard;
