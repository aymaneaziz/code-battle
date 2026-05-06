import React from "react";
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
import { CheckCircle2, Circle } from "lucide-react";

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
    <Badge variant="outline" className={`${styles[difficulty]} font-semibold`}>
      {difficulty}
    </Badge>
  );
};

const ChallengeList = ({ challenges = [], loading }) => {
  const displayData = challenges.length > 0 ? challenges : [];

  return (
    <Card className="shadow-sm border-slate-200 overflow-hidden bg-white">
      <Table>
        <TableHeader className="bg-slate-50/80">
          <TableRow>
            <TableHead className="font-bold text-slate-500 uppercase text-xs">
              Challenge
            </TableHead>
            <TableHead className="font-bold text-slate-500 uppercase text-xs">
              Difficulty
            </TableHead>
            <TableHead className="font-bold text-slate-500 uppercase text-xs">
              XP
            </TableHead>
            <TableHead className="font-bold text-slate-500 uppercase text-xs">
              Solves
            </TableHead>
            <TableHead className="font-bold text-slate-500 uppercase text-xs">
              Win Rate
            </TableHead>
            <TableHead className="font-bold text-slate-500 uppercase text-xs text-center">
              Status
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
          ) : (
            displayData.map((challenge) => (
              <TableRow
                key={challenge.id}
                className="cursor-pointer hover:bg-slate-50 transition-colors group"
              >
                <TableCell className="font-semibold text-slate-900 group-hover:text-blue-600 transition-colors">
                  {challenge.title}
                </TableCell>
                <TableCell>
                  {getDifficultyBadge(challenge.difficulty)}
                </TableCell>
                <TableCell className="font-medium text-slate-600">
                  +{challenge.xp}
                </TableCell>
                <TableCell className="text-slate-600">
                  {challenge.solves.toLocaleString()}
                </TableCell>
                <TableCell className="text-slate-600">
                  {challenge.winRate}
                </TableCell>
                <TableCell className="text-center">
                  {challenge.status === "solved" ? (
                    <CheckCircle2 className="w-5 h-5 text-green-500 mx-auto" />
                  ) : (
                    <Circle className="w-5 h-5 text-slate-300 mx-auto" />
                  )}
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      <div className="p-4 text-center text-sm font-semibold text-blue-600 hover:text-blue-700 bg-slate-50/50 hover:bg-blue-50/50 cursor-pointer border-t border-slate-100 transition-colors">
        Show more &gt;&gt;
      </div>
    </Card>
  );
};

export default ChallengeList;
