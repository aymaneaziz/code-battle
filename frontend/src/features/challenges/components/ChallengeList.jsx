import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Circle,
  Coins,
  Gem,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const getDifficultyBadge = (difficulty) => {
  const styles = {
    Easy: "bg-green-100 text-green-700 border-green-200 hover:bg-green-100",
    Medium:
      "bg-yellow-100 text-yellow-700 border-yellow-200 hover:bg-yellow-100",
    Hard: "bg-red-100 text-red-700 border-red-200 hover:bg-red-100",
    Extreme:
      "bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-100",
  };
  return (
    <Badge
      variant="outline"
      className={`${styles[difficulty] || ""} font-semibold`}
    >
      {difficulty}
    </Badge>
  );
};

const ChallengeList = ({ challenges = [], loading }) => {
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  const handleChallengeClick = (id) => {
    navigate(`/challenges/${id}`, { state: { fromVault: true } });
    // Katsift w7d state ghir bach tgol bli m y9drch ymchi '/challenges/${id}'mn ghir chi blassa mn ghir hadi
  };

  const displayData = showAll ? challenges : challenges.slice(0, 5);

  return (
    <TooltipProvider>
      <Card className="shadow-sm border-slate-200 overflow-hidden bg-white">
        <Table>
          <TableHeader className="bg-slate-50/80">
            <TableRow>
              <TableHead className="font-bold text-slate-500 uppercase text-xs text-center w-12">
                Status
              </TableHead>
              <TableHead className="font-bold text-slate-500 uppercase text-xs">
                Challenge
              </TableHead>
              <TableHead className="font-bold text-slate-500 uppercase text-xs">
                Difficulty
              </TableHead>
              <TableHead className="font-bold text-slate-500 uppercase text-xs">
                Rewards
              </TableHead>
              <TableHead className="font-bold text-slate-500 uppercase text-xs">
                Solves
              </TableHead>
              <TableHead className="font-bold text-slate-500 uppercase text-xs">
                Win Rate
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan="6"
                  className="text-center py-8 text-slate-500"
                >
                  Loading challenges...
                </TableCell>
              </TableRow>
            ) : displayData.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan="6"
                  className="text-center py-8 text-slate-500"
                >
                  No challenges found.
                </TableCell>
              </TableRow>
            ) : (
              displayData.map((challenge) => (
                <TableRow
                  key={challenge.id}
                  className="cursor-pointer hover:bg-slate-50 transition-colors group"
                  onClick={() => handleChallengeClick(challenge.id)}
                >
                  <TableCell className="text-center">
                    {challenge.status === "solved" ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-300 mx-auto" />
                    )}
                  </TableCell>

                  <TableCell className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {challenge.title}
                  </TableCell>

                  <TableCell>
                    {getDifficultyBadge(challenge.difficulty)}
                  </TableCell>

                  {/* REWARDS COLUMN */}
                  <TableCell>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center gap-3 cursor-pointer">
                          {/* XP */}
                          <div className="flex items-center gap-1 text-green-600 font-bold text-xs">
                            <Zap size={14} className="fill-green-600" />+
                            {challenge.xp} XP
                          </div>
                        </div>
                      </TooltipTrigger>
                      <TooltipContent className="bg-slate-900 text-white p-3 text-xs rounded-xl shadow-xl border-slate-700">
                        <div className="space-y-1.5 min-w-25">
                          <p className="font-black text-[10px] uppercase tracking-wider text-slate-400 border-b border-slate-700 pb-1 mb-2">
                            Total Rewards
                          </p>
                          <div className="flex justify-between items-center gap-4">
                            <span className="text-slate-300">XP</span>
                            <span className="text-green-400 font-bold">
                              +{challenge.xp} XP
                            </span>
                          </div>
                          {challenge.reward?.coins > 0 && (
                            <div className="flex justify-between items-center gap-4">
                              <span className="text-slate-300">Coins</span>
                              <span className="text-amber-400 font-bold">
                                +{challenge.reward.coins}
                              </span>
                            </div>
                          )}
                          {challenge.reward?.gems > 0 && (
                            <div className="flex justify-between items-center gap-4">
                              <span className="text-slate-300">Gems</span>
                              <span className="text-indigo-400 font-bold">
                                +{challenge.reward.gems}
                              </span>
                            </div>
                          )}
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>

                  <TableCell className="text-slate-600 font-medium">
                    {challenge.solves?.toLocaleString()}
                  </TableCell>

                  <TableCell className="text-slate-600 font-medium">
                    {challenge.winRate}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {!loading && challenges.length > 5 && (
          <div
            onClick={(e) => {
              e.stopPropagation();
              setShowAll(!showAll);
            }}
            className="p-4 flex items-center justify-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 bg-slate-50/50 hover:bg-blue-50/50 cursor-pointer border-t border-slate-100 transition-all select-none"
          >
            {showAll ? (
              <>
                Show less <ChevronUp className="w-4 h-4" />
              </>
            ) : (
              <>
                Show more ({challenges.length}){" "}
                <ChevronDown className="w-4 h-4" />
              </>
            )}
          </div>
        )}
      </Card>
    </TooltipProvider>
  );
};

export default ChallengeList;
