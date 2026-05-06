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
  // Safety check: Ensure both daily and the populated problemId exist
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
          <Badge
            variant="outline"
            className="bg-green-50 text-green-600 border-green-200 shadow-none font-bold"
          >
            {/* FIX: Changed daily.xpBonus to daily.xp based on your model */}+
            {daily.xp} XP
          </Badge>
          <div className="flex items-center text-slate-400 text-xs font-medium gap-1">
            <Clock className="w-3.5 h-3.5" />
            24h Left
          </div>
        </div>
      </CardContent>

      <CardFooter>
        <Button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold shadow-sm">
          Play Daily
        </Button>
      </CardFooter>
    </Card>
  );
};
export default DailyChallengeWidget;
