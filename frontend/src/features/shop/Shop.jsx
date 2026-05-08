import { getToken } from "@clerk/react";
import React, { useEffect, useState } from "react";
import { Loading } from "@/components/common/Loading";

import getDailyDeals from "./services/getDailyDeals";
import getShopItems from "./services/getShopItems";
import getBundles from "./services/getBundles";

import DailyDeals from "./components/DailyDeals";

export const Shop = () => {
  const [data, setData] = useState({
    dailyDeals: null,
    shopItems: null,
    bundles: null,
  });

  const [loading, setLoading] = useState(true);
  const [timeLeft, setTimeLeft] = useState("");

  //----------------------------timer----------------------------
  useEffect(() => {
    const updateTimer = () => {
      const now = new Date();

      const nextDay = new Date();
      nextDay.setHours(24, 0, 0, 0);

      const diff = nextDay - now;

      const hours = Math.floor(diff / (1000 * 60 * 60));
      const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((diff % (1000 * 60)) / 1000);

      setTimeLeft(
        `${hours.toString().padStart(2, "0")}h ${minutes
          .toString()
          .padStart(2, "0")}m ${seconds.toString().padStart(2, "0")}s`
      );
    };

    updateTimer();

    const interval = setInterval(updateTimer, 1000);

    return () => clearInterval(interval);
  }, []);

  //----------------------------data----------------------------
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getToken();

        if (!token) return;

        const [dailyDeals, shopItems, bundles] = await Promise.all([
          getDailyDeals(token),
          getShopItems(token),
          getBundles(token),
        ]);

        setData({
          dailyDeals,
          shopItems,
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

  if (loading || !data) return <Loading />;

  return (
    <div className="text-slate-900 min-h-screen p-4 md:p-8 bg-slate-50">
      <div className="flex flex-col mx-auto space-y-8">
        <main className="space-y-10">
          {/* DailyDeals section */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                Daily Deals Reset In:
              </h2>
              <span className="text-sm font-extrabold text-red-500">
                {timeLeft}
              </span>
              <div className="h-px flex-1 bg-slate-200"></div>
            </div>
            <DailyDeals data={data.dailyDeals} />
          </section>
        </main>
      </div>
    </div>
  );
};
