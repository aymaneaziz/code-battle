import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { useAuth } from "@clerk/clerk-react";
import { fetchDailyChallenge } from "../services/challengeApi";
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
const DailyChallengeWidget = () => {
  const { getToken } = useAuth();
  const [daily, setDaily] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadDaily = async () => {
      try {
        const token = await getToken();
        const data = await fetchDailyChallenge(token);

        setDaily(data);
      } catch (err) {
        console.error("Error loading daily challenge");
      } finally {
        setLoading(false);
      }
    };
    loadDaily();
  }, [getToken]);

  if (loading) return <Card className="p-6">Loading...</Card>;

  if (!daily || !daily.problemId) return null;

  return (
    <Card className="shadow-sm border-slate-200 bg-white flex flex-col ">
      <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-slate-100">
        <CardTitle className="text-lg font-extrabold tracking-tight text-slate-900">
          Daily Challenge
        </CardTitle>
        <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-200 shadow-none">
          New
        </Badge>
      </CardHeader>

      <CardContent className="pt-4 ">
        {/* FIX: Use daily.problemId to reach title and description */}
        <h3 className="text-md font-bold text-slate-800 mb-2">
          {daily.problemId.title}
        </h3>
        <p className="text-sm text-slate-500 leading-relaxed line-clamp-3">
          {daily.problemId.description}
        </p>

        <div className="flex justify-between items-center mt-6">
          <div className="flex gap-2">
            <Badge
              variant="outline"
              className="bg-green-50 text-green-600 border-green-200 shadow-none font-bold"
            >
              {daily.xp} XP
            </Badge>
            {getDifficultyBadge(daily.problemId.difficulty)}
          </div>

          <div className="flex items-center text-slate-400 text-xs font-medium gap-1">
            <Clock className="w-3.5 h-3.5" />
            24h Left
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-sm cursor-pointer">
          Play Daily
        </Button>
      </CardFooter>
    </Card>
  );
};
export default DailyChallengeWidget;
