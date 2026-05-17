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
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  CheckCircle2,
  ChevronDown,
  ChevronUp,
  Circle,
  Coins,
  Gem,
  Loader2,
  Zap,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const DIFFICULTY_STYLES = {
  Easy: "bg-green-100 text-green-700   border-green-200  hover:bg-green-100",
  Medium: "bg-yellow-100 text-yellow-700 border-yellow-200 hover:bg-yellow-100",
  Hard: "bg-red-100 text-red-700       border-red-200    hover:bg-red-100",
  Extreme:
    "bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-100",
};

const DifficultyBadge = ({ difficulty }) => (
  <Badge
    variant="outline"
    className={`font-semibold ${DIFFICULTY_STYLES[difficulty] ?? ""}`}
  >
    {difficulty}
  </Badge>
);

// ── Reward  ila kan deja khdahom  ─────────────────────────────────
const RewardPill = ({ icon: Icon, value, label, color, claimed }) => {
  if (!value) return null;
  return (
    <div
      className={`flex justify-between items-center gap-4 ${claimed ? "opacity-40" : ""}`}
    >
      <span className="text-slate-300">{label}</span>
      <span className={`font-bold ${claimed ? "text-slate-400" : color}`}>
        {claimed ? "✓" : "+"}
        {value}
        {label === "XP" ? " XP" : ""}
      </span>
    </div>
  );
};

const ChallengeList = ({ challenges = [], loading }) => {
  const [showAll, setShowAll] = useState(false);
  const navigate = useNavigate();

  const displayData = showAll ? challenges : challenges.slice(0, 8);

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
                Acceptance
              </TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-8 text-slate-500"
                >
                  <div className="flex items-center justify-center gap-2">
                    <Loader2 className="h-4 w-4 animate-spin text-slate-400" />
                    <span className="text-sm font-medium">
                      Loading challenges...
                    </span>
                  </div>
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
                  onClick={() =>
                    navigate(`/challenges/${challenge.id}`, {
                      state: { fromVault: true },
                    })
                  }
                >
                  {/* Status */}
                  <TableCell className="text-center">
                    {challenge.status === "solved" ? (
                      <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" />
                    ) : (
                      <Circle className="w-5 h-5 text-slate-300 mx-auto" />
                    )}
                  </TableCell>

                  {/* Title */}
                  <TableCell className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                    {challenge.title}
                  </TableCell>

                  {/* Difficulty */}
                  <TableCell>
                    <DifficultyBadge difficulty={challenge.difficulty} />
                  </TableCell>

                  {/* Rewards — greyed if claimed */}
                  <TableCell>
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <div className="flex items-center gap-1.5 cursor-pointer">
                          <div
                            className={`flex items-center gap-1 text-xs font-bold ${challenge.rewardClaimed ? "text-slate-400 line-through" : "text-green-600"}`}
                          >
                            <Zap
                              size={13}
                              className={
                                challenge.rewardClaimed
                                  ? "text-slate-300"
                                  : "fill-green-600"
                              }
                            />
                            +{challenge.xp} XP
                          </div>
                          {challenge.rewardClaimed && (
                            <span className="text-[9px] font-bold text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded-full border border-slate-200">
                              Claimed
                            </span>
                          )}
                        </div>
                      </TooltipTrigger>

                      <TooltipContent className="bg-slate-900 text-white p-3 text-xs rounded-xl shadow-xl border-slate-700">
                        <div className="space-y-1.5 min-w-28">
                          <p className="font-black text-[10px] uppercase tracking-wider text-slate-400 border-b border-slate-700 pb-1 mb-2">
                            {challenge.rewardClaimed
                              ? "Rewards (Claimed)"
                              : "Rewards"}
                          </p>
                          <RewardPill
                            label="XP"
                            value={challenge.xp}
                            color="text-green-400"
                            claimed={challenge.rewardClaimed}
                          />
                          <RewardPill
                            label="Coins"
                            value={challenge.reward?.coins}
                            color="text-amber-400"
                            claimed={challenge.rewardClaimed}
                          />
                          <RewardPill
                            label="Gems"
                            value={challenge.reward?.gems}
                            color="text-indigo-400"
                            claimed={challenge.rewardClaimed}
                          />
                        </div>
                      </TooltipContent>
                    </Tooltip>
                  </TableCell>

                  {/* Solves */}
                  <TableCell className="text-slate-600 font-medium">
                    {challenge.solves?.toLocaleString()}
                  </TableCell>

                  {/* Acceptance rate */}
                  <TableCell className="text-slate-600 font-medium">
                    {challenge.winRate}
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>

        {!loading && challenges.length > 8 && (
          <div
            onClick={() => setShowAll(!showAll)}
            className="p-4 flex items-center justify-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 bg-slate-50/50 hover:bg-blue-50/50 cursor-pointer border-t border-slate-100 transition-all select-none"
          >
            {showAll ? (
              <>
                {" "}
                Show less <ChevronUp className="w-4 h-4" />{" "}
              </>
            ) : (
              <>
                {" "}
                Show more ({challenges.length}){" "}
                <ChevronDown className="w-4 h-4" />{" "}
              </>
            )}
          </div>
        )}
      </Card>
    </TooltipProvider>
  );
};

export default ChallengeList;
