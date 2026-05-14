import React from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

const ChallengeFilters = ({ filters, setFilters }) => {
  const difficulties = ["All", "Easy", "Medium", "Hard", "Extreme"];
  const statuses = ["All", "Solved", "Unsolved"];

  return (
    <Card className="p-4 shadow-sm border-slate-200 bg-white mb-6">
      <div className="flex flex-col lg:flex-row lg:items-center justify-between w-full gap-6">
        {/* Filter Groups */}
        <div className="flex flex-col md:flex-row md:items-center gap-6 lg:gap-8">
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider shrink-0">
              Difficulty:
            </span>

            <div className="flex flex-wrap gap-1.5">
              {difficulties.map((diff) => (
                <Button
                  key={diff}
                  variant={filters.difficulty === diff ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilters({ ...filters, difficulty: diff })}
                  className={`h-8 px-3 text-xs font-medium rounded-md transition-all cursor-pointer ${
                    filters.difficulty === diff
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "text-slate-600 bg-transparent border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  {diff}
                </Button>
              ))}
            </div>
          </div>

          {/* Status */}
          <div className="flex flex-col sm:flex-row sm:items-center gap-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider shrink-0">
              Status:
            </span>
            <div className="flex flex-wrap gap-1.5">
              {statuses.map((stat) => (
                <Button
                  key={stat}
                  variant={filters.status === stat ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilters({ ...filters, status: stat })}
                  className={`h-8 px-3 text-xs font-medium rounded-md transition-all cursor-pointer ${
                    filters.status === stat
                      ? "bg-blue-600 hover:bg-blue-700 text-white"
                      : "text-slate-600 bg-transparent border-slate-200 hover:bg-slate-50"
                  }`}
                >
                  {stat}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Search Bar - Full width on mobile, fixed width on desktop */}
        <div className="relative w-full lg:w-72 shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            type="text"
            placeholder="Search challenges..."
            className="pl-9 h-10 lg:h-9 text-sm bg-slate-50 border-slate-200 focus-visible:ring-blue-500 w-full"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
        </div>
      </div>
    </Card>
  );
};

export default ChallengeFilters;
