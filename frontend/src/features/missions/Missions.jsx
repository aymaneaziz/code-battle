import { getToken } from "@clerk/react";
import { useEffect, useState, useRef } from "react";
import { Loading } from "@/components/common/Loading";
import { Card } from "@/components/ui/card";
import updateSeasonTimer from "@/service/SeasonTimer";
import updateDailyTimer from "@/service/DailyTimer";

import getMission from "./services/getMission";
import getProgress from "./services/getProgress";
import Header from "./components/Header";
import Body from "./components/Body";
import putClaimRewards from "./services/putClaimRewards";
import putMissionProgress from "@/service/putMissionProgress";

export const Missions = () => {
  const [missions, setMissions] = useState([]);
  const [missionCategory, setMissionCategory] = useState("DAILY");
  const [loading, setLoading] = useState(true);
  const [isBodyLoading, setIsBodyLoading] = useState(false);
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
        setIsBodyLoading(true);
        setHeader((prev) => ({
          ...prev,
          selectedCategory: missionCategory,
        }));

        const token = await getToken();

        if (!token) return;

        const [missionsRes, progressRes] = await Promise.all([
          getMission(token, missionCategory),
          getProgress(token),
        ]);

        setMissions(missionsRes);
        setHeader((prev) => ({ ...prev, stats: progressRes }));
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
        setIsBodyLoading(false);
      }
    };

    fetchData();
  }, [getToken, missionCategory]);

  // -------------------------------------------------------claim reward-------------------------------------------------
  const claimReward = async (missionInstanceId) => {
    try {
      const token = await getToken();
      if (!token) return;

      const response = await putClaimRewards(token, missionInstanceId);
      console.log("Claim Reward Response:", response);

      // Refresh missions and progress after claiming reward
      const [missionsRes, progressRes] = await Promise.all([
        getMission(token, missionCategory),
        getProgress(token),
      ]);

      setMissions(missionsRes);
      setHeader((prev) => ({ ...prev, stats: progressRes }));
    } catch (error) {
      console.error(error);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 p-6 md:p-8 font-sans flex flex-col gap-6">
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
      <Body
        missions={missions}
        onClaim={claimReward}
        isLoading={isBodyLoading}
      />
      {/* to test the progress API
      <button
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors cursor-pointer"
        onClick={async () => {
          const token = await getToken();
          if (!token) return;
          await putMissionProgress(token, "WIN_MATCH");
        }}
      >
        Test Progress API
      </button>*/}
    </div>
  );
};
