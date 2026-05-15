import { getToken } from "@clerk/react";
import { useEffect, useState, useRef } from "react";
import { Loading } from "@/components/common/Loading";
import { Card } from "@/components/ui/card";
import updateSeasonTimer from "@/service/updateSeasonTimer";
import updateDailyTimer from "@/service/updateDailyTimer";

import getMission from "./services/getMission";
import getProgress from "./services/getProgress";
import Header from "./components/Header";
import Body from "./components/Body";
import putMissionProgress from "@/service/putMissionProgress";

export const Missions = () => {
  const [missions, setMissions] = useState([]);
  const [missionCategory, setMissionCategory] = useState("DAILY");
  const [loading, setLoading] = useState(true);
  const [header, setHeader] = useState({
    stats: "",
    selectedCategory: "DAILY",
  });

  // 🟢 DAILY TIMER
  const [dailyTimeLeft, setDailyTimeLeft] = useState("");

  // 🔵 SEASON TIMER
  const [seasonTimeLeft, setSeasonTimeLeft] = useState("");

  // refs for intervals
  const dailyIntervalRef = useRef(null);
  const seasonIntervalRef = useRef(null);

  // -------------------------------------------------------
  // ⏱ DAILY DEALS TIMER
  // -------------------------------------------------------
  useEffect(() => {
    // first execution immediately
    updateDailyTimer(setDailyTimeLeft);

    // store interval id in ref
    dailyIntervalRef.current = setInterval(() => {
      updateDailyTimer(setDailyTimeLeft);
    }, 1000);

    // cleanup
    return () => {
      clearInterval(dailyIntervalRef.current);
    };
  }, []);

  // -------------------------------------------------------
  // 🌍 SEASON TIMER
  // -------------------------------------------------------
  useEffect(() => {
    updateSeasonTimer(setSeasonTimeLeft);

    // store interval id in ref
    seasonIntervalRef.current = setInterval(() => {
      updateSeasonTimer(setSeasonTimeLeft);
    }, 60000);

    // cleanup
    return () => {
      clearInterval(seasonIntervalRef.current);
    };
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setHeader((prev) => ({
          ...prev,
          selectedCategory: missionCategory,
        }));

        const token = await getToken();

        if (!token) return;

        await putMissionProgress(token, "WIN_MATCH");
        const [missionsRes, progressRes] = await Promise.all([
          getMission(token, missionCategory),
          getProgress(token),
        ]);

        console.log(progressRes);
        setMissions(missionsRes);
        setHeader((prev) => ({ ...prev, stats: progressRes }));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [getToken, missionCategory]);

  if (loading) return <Loading />;

  return (
    <Card className="min-h-screen bg-zinc-100 p-6">
      {/* Header */}
      <Header data={header} onClick={setMissionCategory} />
      <div className="flex items-center gap-2">
        <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest">
          {missionCategory} Missions Reset In:
        </h2>
        {/* ⏱ timer basé sur minuit */}
        <span className="text-sm font-extrabold text-red-500">
          {missionCategory === "DAILY" && dailyTimeLeft}
          {missionCategory === "SEASONAL" && seasonTimeLeft}
        </span>
        <div className="h-px flex-1 bg-slate-200"></div>
      </div>
      {/* Body */}
      <Body missions={missions} />
    </Card>
  );
};
