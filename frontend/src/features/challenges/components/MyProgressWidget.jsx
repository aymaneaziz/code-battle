import React, { useEffect, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { useAuth } from "@clerk/clerk-react";
import { fetchUserProgress } from "../services/challengeApi";

const MyProgressWidget = () => {
  const { getToken } = useAuth();
  const [stats, setStats] = useState([]);

  useEffect(() => {
    const loadProgress = async () => {
      try {
        const token = await getToken();
        const data = await fetchUserProgress(token);

        const coloredStats = data.map((stat) => {
          let colorClass = "bg-slate-500";
          if (stat.label === "Easy") colorClass = "bg-green-500";
          if (stat.label === "Medium") colorClass = "bg-yellow-400";
          if (stat.label === "Hard") colorClass = "bg-red-500";
          if (stat.label === "Extreme") colorClass = "bg-purple-500";
          return { ...stat, colorClass };
        });

        setStats(coloredStats);
      } catch (err) {
        console.error("Error loading progress:", err);
        setStats([]);
      }
    };
    loadProgress();
  }, [getToken]);

  return (
    <Card className="shadow-sm border-slate-200 bg-white">
      <CardHeader className="pb-3 border-b border-slate-100">
        <CardTitle className="text-lg font-extrabold tracking-tight text-slate-900">
          My Progress
        </CardTitle>
      </CardHeader>

      <CardContent className="pt-5 space-y-5">
        {stats.map((stat) => {
          const percentage = (stat.solved / stat.total) * 100;
          return (
            <div key={stat.label}>
              <div className="flex justify-between text-sm font-medium text-slate-600 mb-2">
                <span>{stat.label}</span>
                <span className="text-slate-900 font-bold">
                  {stat.solved}{" "}
                  <span className="text-slate-400 font-normal">
                    / {stat.total}
                  </span>
                </span>
              </div>
              {/*Progress bar*/}
              <div className="w-full bg-slate-100 rounded-full h-2 overflow-hidden">
                <div
                  className={`${stat.colorClass} h-full rounded-full transition-all duration-500 ease-in-out`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}

        {/* Legend */}
        <div className="flex justify-center gap-6 mt-6 pt-4 text-xs text-slate-500 font-medium border-t border-slate-100">
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-green-500"></span>
            Solved
          </span>
          <span className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full border-2 border-slate-200"></span>
            Unsolved
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default MyProgressWidget;
