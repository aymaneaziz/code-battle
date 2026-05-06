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
      <div className="flex flex-row items-center justify-between w-full gap-4">
        {/* Left Side: Difficulty and Status Filters */}
        <div className="flex flex-row items-center gap-8">
          {/* Difficulty */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Difficulty:
            </span>
            <div className="flex gap-1.5">
              {difficulties.map((diff) => (
                <Button
                  key={diff}
                  variant={filters.difficulty === diff ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilters({ ...filters, difficulty: diff })}
                  className={`h-8 px-3 text-xs font-medium rounded-md ${
                    filters.difficulty === diff
                      ? "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                      : "text-slate-600 bg-transparent border-slate-200 cursor-pointer"
                  }`}
                >
                  {diff}
                </Button>
              ))}
            </div>
          </div>

          {/* Status */}
          <div className="flex items-center gap-3">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Status:
            </span>
            <div className="flex gap-1.5">
              {statuses.map((stat) => (
                <Button
                  key={stat}
                  variant={filters.status === stat ? "default" : "outline"}
                  size="sm"
                  onClick={() => setFilters({ ...filters, status: stat })}
                  className={`h-8 px-3 text-xs font-medium rounded-md ${
                    filters.status === stat
                      ? "bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                      : "text-slate-600 bg-transparent border-slate-200  cursor-pointer"
                  }`}
                >
                  {stat}
                </Button>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Search Bar */}
        <div className="relative w-72 shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            type="text"
            placeholder="Search challenges..."
            className="pl-9 h-9 text-sm bg-slate-50 border-slate-200 focus-visible:ring-blue-500"
            value={filters.search}
            onChange={(e) => setFilters({ ...filters, search: e.target.value })}
          />
        </div>
      </div>
    </Card>
  );
};

export default ChallengeFilters;
