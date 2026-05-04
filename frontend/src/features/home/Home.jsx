import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useUser, useAuth } from "@clerk/clerk-react";
import api from "../../service/GlobalApi";
import { Loading } from "@/components/common/Loading";

import Standard from "./components/Standard";
import Welcome from "./components/Welcome";
import PlayerCard from "./components/PlayerCard";
import ServerStats from "./components/ServerStats";
import CodeArenaLogo from "../../assets/Code-Arena.svg";
import { Challenges } from "../challenges/Challenges";

const Home = () => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState({ home: null, player: null });
  const [nav, setNav] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getToken();

        // Promise.all bach nrebho lweqt (parallel calls)
        const [homeData, playerData] = await Promise.all([
          api.get("/home/data"),
          token
            ? api.get("/home/player", {
                headers: { Authorization: `Bearer ${token}` },
              })
            : null,
        ]);

        // Hna f Fetch, homeData hwa lobj lli fih currentSeason
        setData({ home: homeData, player: playerData });
      } catch (err) {
        console.error("Erreur f l-khidma:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [getToken]); // user tqder tzad hna ila kenti mhtajha

  if (nav === "findMatch") return <Navigate to="/matchMaking" />;
  if (nav === "Practice") return <Navigate to="/Practice" />;

  if (loading || !data.home) return <Loading />;
  return (
    <div className="text-slate-900 min-h-screen p-4 md:p-8 bg-slate-50">
      <div className="flex flex-col max-w-6xl mx-auto space-y-8">
        <main className="space-y-10">
          {data.player ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Standard
                season={data.home.currentSeason}
                week={data.home.currentWeek}
                handleClick={setNav}
              />
              <PlayerCard player={data.player} />
            </div>
          ) : (
            <Welcome handleClick={setNav} />
          )}

          {/* Stats section */}
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                Server Overview
              </h2>
              <div className="h-px flex-1 bg-slate-200"></div>
            </div>
            <ServerStats stats={data.home} />
          </section>
          <section className="space-y-4">
            <div className="flex items-center gap-2">
              <h2 className="text-sm font-bold text-slate-500 uppercase tracking-widest">
                Featured Challenges
              </h2>
              <div className="h-px flex-1 bg-slate-200"></div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Home;
