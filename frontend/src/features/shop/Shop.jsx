import { getToken } from "@clerk/react";
import React, { useEffect, useState, useRef } from "react";
import { Loading } from "@/components/common/Loading";
import { toast } from "sonner";

import getDailyDeals from "./services/getDailyDeals";
import getSeasonSpotlights from "./services/getSeasonSpotlights";
import getBundles from "./services/getBundles";
import putPurchasedItems from "./services/putPurchasedItems";
import seasonTimer from "@/service/seasonTimer";
import dailyTimer from "@/service/dailyTimer";

import Deals from "./components/Deals";
import Bundles from "./components/Bundles";
import Confirm from "./components/Confirm";
import Purchasing from "./components/Purchasing";
import putMissionProgress from "@/service/putMissionProgress";

export const Shop = () => {
  const [data, setData] = useState({
    dailyDeals: null,
    seasonSpotlights: null,
    bundles: null,
  });

  const [selectedItem, setSelectedItem] = useState("");
  const [mode, setMode] = useState("");
  const [loading, setLoading] = useState(true);

  const handlePurchase = (item) => {
    setSelectedItem(item);
    setMode("Confirm");
  };

  const handleClose = () => {
    setMode(null);
  };

  const purchase = async (item) => {
    setMode("Purchase");
    try {
      const token = await getToken();
      if (!token) return;
      await putPurchasedItems(token, item);
      const [dailyDeals, seasonSpotlights, bundles] = await Promise.all([
        getDailyDeals(token),
        getSeasonSpotlights(token),
        getBundles(token),
      ]);

      setData({
        dailyDeals,
        seasonSpotlights,
        bundles,
      });

      await putMissionProgress(token, "BUY_ITEM");
      toast.success("Purchase Succeeded!");
    } catch (error) {
      console.error(error);
      toast.error("Purchase failed");
    } finally {
      setMode(null);
    }
  };

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

  // -------------------------------------------------------
  // 📦 FETCH DATA
  // -------------------------------------------------------
  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getToken();
        if (!token) return;

        const [dailyDeals, seasonSpotlights, bundles] = await Promise.all([
          getDailyDeals(token),
          getSeasonSpotlights(token),
          getBundles(token),
        ]);

        setData({
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
    <div className="min-h-screen bg-slate-50/50 text-slate-900 p-2 md:p-4 font-sans flex flex-col gap-6">
      <div className="flex flex-col space-y-8">
        <main className="space-y-10">
          {/* ------------------------------------------------ */}
          {/* 🟢 DAILY DEALS */}
          {/* ------------------------------------------------ */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest">
                Daily Deals Reset In:
              </h2>
              {/* ⏱ timer basé sur minuit */}
              <span className="text-sm font-extrabold text-red-500">
                {dailyTimeLeft}
              </span>
              <div className="h-px flex-1 bg-slate-200"></div>
            </div>
            <Deals data={data.dailyDeals} purchase={handlePurchase} />
          </section>

          {/* ------------------------------------------------ */}
          {/* 🔵 SEASON SPOTLIGHT */}
          {/* ------------------------------------------------ */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest">
                Season Spotlights Ends In:
              </h2>
              {/* 🌍 timer basé sur seasonEndDate backend */}
              <span className="text-sm font-extrabold text-orange-500">
                {seasonTimeLeft}
              </span>
              <div className="h-px flex-1 bg-slate-200"></div>
            </div>
            <Deals data={data.seasonSpotlights} purchase={handlePurchase} />
          </section>

          {/* ------------------------------------------------ */}
          {/* 🎁 BUNDLES */}
          {/* ------------------------------------------------ */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-widest">
                Special Bundles:
              </h2>
              <div className="h-px flex-1 bg-slate-200"></div>
            </div>
            <Bundles data={data.bundles} purchase={handlePurchase} />
          </section>
        </main>
      </div>
      {/* Confirm Modal */}
      {mode === "Confirm" && selectedItem && (
        <Confirm
          mode={mode}
          selectedItem={selectedItem}
          handleClose={() => handleClose()}
          purchase={purchase}
        />
      )}

      {mode === "Purchase" && <Purchasing />}
    </div>
  );
};
