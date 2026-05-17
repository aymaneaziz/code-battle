import { getToken } from "@clerk/react";
import { useEffect, useState, useRef } from "react";
import { Loading } from "@/components/common/Loading";
import seasonTimer from "@/service/seasonTimer";
import dailyTimer from "@/service/dailyTimer";
import { toast } from "sonner";

import getMission from "./services/getMission";
import getProgress from "./services/getProgress";
import Header from "./components/Header";
import Body from "./components/Body";
import putClaimRewards from "./services/putClaimRewards";
import putMissionProgress from "@/service/putMissionProgress";
import weeklyTimer from "@/service/weeklyTimer";

export const Missions = () => {
  const [missions, setMissions] = useState([]);
  const [missionCategory, setMissionCategory] = useState("DAILY");
  const [loading, setLoading] = useState(true);
  const [isBodyLoading, setIsBodyLoading] = useState(false);
  const [header, setHeader] = useState({
    stats: "",
    selectedCategory: "DAILY",
  });

  // TIMERES
  const [dailyTimeLeft, setDailyTimeLeft] = useState("");
  const [weeklyTimeLeft, setWeeklyTimeLeft] = useState("");
  const [seasonTimeLeft, setSeasonTimeLeft] = useState("");

  // refs for intervals
  const dailyIntervalRef = useRef(null);
  const weeklyIntervalRef = useRef(null);
  const seasonIntervalRef = useRef(null);

  // -------------------------------------------------------
  // ⏱ DAILY TIMER
  // -------------------------------------------------------
  useEffect(() => {
    // first execution immediately
    dailyTimer(setDailyTimeLeft);

    // store interval id in ref
    dailyIntervalRef.current = setInterval(() => {
      dailyTimer(setDailyTimeLeft);
    }, 1000);

    // cleanup
    return () => {
      clearInterval(dailyIntervalRef.current);
    };
  }, []);

  // -------------------------------------------------------
  // ⏱ WEEKLY TIMER
  // -------------------------------------------------------
  useEffect(() => {
    // first execution immediately
    weeklyTimer(setWeeklyTimeLeft);

    // store interval id in ref
    weeklyIntervalRef.current = setInterval(() => {
      weeklyTimer(setWeeklyTimeLeft);
    }, 60000);

    // cleanup
    return () => {
      clearInterval(weeklyIntervalRef.current);
    };
  }, []);

  // -------------------------------------------------------
  // 🌍 SEASON TIMER
  // -------------------------------------------------------
  useEffect(() => {
    seasonTimer(setSeasonTimeLeft);

    // store interval id in ref
    seasonIntervalRef.current = setInterval(() => {
      seasonTimer(setSeasonTimeLeft);
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

      toast.success("Reward claimed successfully!");
    } catch (error) {
      console.error(error);
      toast.error("Failed to claim reward. Please try again.");
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
          {missionCategory === "WEEKLY" && weeklyTimeLeft}
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
