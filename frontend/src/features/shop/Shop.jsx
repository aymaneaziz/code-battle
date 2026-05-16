import { getToken } from "@clerk/react";
import React, { useEffect, useState, useRef } from "react";
import { Loading } from "@/components/common/Loading";
import { toast } from "sonner";

import getDailyDeals from "./services/getDailyDeals";
import getSeasonSpotlights from "./services/getSeasonSpotlights";
import getBundles from "./services/getBundles";
import putPurchasedItems from "./services/putPurchasedItems";
import updateSeasonTimer from "@/service/SeasonTimer";
import updateDailyTimer from "@/service/DailyTimer";

import Deals from "./components/Deals";
import Bundles from "./components/Bundles";
import Confirm from "./components/Confirm";
import Purchasing from "./components/Purchasing";

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
            <Deals data={data.dailyDeals} purchase={handlePurchase} />
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
            <Deals data={data.seasonSpotlights} purchase={handlePurchase} />
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
