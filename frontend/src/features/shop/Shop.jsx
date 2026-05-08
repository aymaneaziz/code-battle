import { getToken } from "@clerk/react";
import React, { useEffect, useState } from "react";
import { Loading } from "@/components/common/Loading";

import getDailyDeals from "./services/getDailyDeals";
import getSeasonSpotlights from "./services/getSeasonSpotlights";
import getBundles from "./services/getBundles";
import getSeasonEnd from "./services/getSeasonEndDate";
import putPurchasedItems from "./services/putPurchasedItems";

import DailyDeals from "./components/DailyDeals";
import SeasonSpotlights from "./components/SeasonSpotlights";
import Bundles from "./components/Bundles";

export const Shop = () => {
  const [data, setData] = useState({
    seasonEndDate: null,
    dailyDeals: null,
    seasonSpotlights: null,
    bundles: null,
  });

  const [loading, setLoading] = useState(true);

  // 🟢 DAILY TIMER (reset chaque jour à minuit)
  const [dailyTimeLeft, setDailyTimeLeft] = useState("");
  // 🔵 SEASON TIMER (expire à date fixe backend)
  const [seasonTimeLeft, setSeasonTimeLeft] = useState("");

  const purchase = async (item) => {
    const token = await getToken();
    if (!token) return;
    await putPurchasedItems(token, item);
  };

  // -------------------------------------------------------
  // ⏱ DAILY DEALS TIMER
  // -------------------------------------------------------
  useEffect(() => {
    const updateDailyTimer = () => {
      const now = new Date();
      // 👉 prochain reset = minuit (00:00 du jour suivant)
      const nextMidnight = new Date();
      nextMidnight.setHours(24, 0, 0, 0);
      const diff = nextMidnight - now;
      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);
      setDailyTimeLeft(
        `${hours.toString().padStart(2, "0")}h ${minutes
          .toString()
          .padStart(2, "0")}m ${seconds.toString().padStart(2, "0")}s`
      );
    };
    updateDailyTimer();
    const interval = setInterval(updateDailyTimer, 1000);
    return () => clearInterval(interval);
  }, []);

  // -------------------------------------------------------
  // 🌍 SEASON TIMER (basé sur backend)
  // -------------------------------------------------------
  useEffect(() => {
    const updateSeasonTimer = () => {
      const seasonEndDate = data?.seasonEndDate?.seasonEndDate || null;
      const now = new Date();
      const end = seasonEndDate ? new Date(seasonEndDate) : null;
      if (!end) return;
      const diff = end - now;
      if (diff <= 0) {
        setSeasonTimeLeft("Season Ended");
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      setSeasonTimeLeft(`${days}d ${hours}h`);
    };
    updateSeasonTimer();
    const interval = setInterval(updateSeasonTimer, 60000); // update chaque minute
    return () => clearInterval(interval);
  }, [data?.seasonEndDate?.seasonEndDate]);

  // -------------------------------------------------------
  // 📦 FETCH DATA
  // -------------------------------------------------------
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getToken();
        if (!token) return;

        const [seasonEndDate, dailyDeals, seasonSpotlights, bundles] =
          await Promise.all([
            getSeasonEnd(token),
            getDailyDeals(token),
            getSeasonSpotlights(token),
            getBundles(token),
          ]);

        setData({
          seasonEndDate,
          dailyDeals,
          seasonSpotlights,
          bundles,
        });
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [getToken]);

  if (loading) return <Loading />;

  return (
    <div className="text-slate-900 min-h-screen p-4 md:p-8 bg-slate-50">
      <div className="flex flex-col mx-auto space-y-8">
        <main className="space-y-10">
          {/* ------------------------------------------------ */}
          {/* 🟢 DAILY DEALS */}
          {/* ------------------------------------------------ */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                Daily Deals Reset In:
              </h2>
              {/* ⏱ timer basé sur minuit */}
              <span className="text-sm font-extrabold text-red-500">
                {dailyTimeLeft}
              </span>
              <div className="h-px flex-1 bg-slate-200"></div>
            </div>
            <DailyDeals data={data.dailyDeals} purchase={purchase} />
          </section>

          {/* ------------------------------------------------ */}
          {/* 🔵 SEASON SPOTLIGHT */}
          {/* ------------------------------------------------ */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                Season Spotlights Ends In:
              </h2>
              {/* 🌍 timer basé sur seasonEndDate backend */}
              <span className="text-sm font-extrabold text-orange-500">
                {seasonTimeLeft}
              </span>
              <div className="h-px flex-1 bg-slate-200"></div>
            </div>
            <SeasonSpotlights
              data={data.seasonSpotlights}
              purchase={purchase}
            />
          </section>

          {/* ------------------------------------------------ */}
          {/* 🎁 BUNDLES */}
          {/* ------------------------------------------------ */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                Special Bundles:
              </h2>
              <div className="h-px flex-1 bg-slate-200"></div>
            </div>
            <Bundles data={data.bundles} purchase={purchase} />
          </section>
        </main>
      </div>
    </div>
  );
};
