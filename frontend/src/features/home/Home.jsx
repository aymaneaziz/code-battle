import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { useUser, useAuth } from "@clerk/clerk-react";
import api from "../../service/GlobalApi";
import { Loading } from "@/components/common/Loading";

import Standard from "./components/Standard";
import Welcome from "./components/Welcome";
import PlayerCard from "./components/PlayerCard";
import ServerStats from "./components/ServerStats";

const Home = () => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const [homeData, setHomeData] = useState(null);
  const [playerData, setPlayerData] = useState(null);

  const [nav, setNav] = useState(null);

  const handleClick = (c) => {
    setNav(c);
  };

  useEffect(() => {
    const initializeData = async () => {
      try {
        const token = await getToken();
        const res1 = await api.get("/home/data");
        let res2 = null;
        if (token) {
          res2 = await api.get("/home/player", {
            headers: { Authorization: `Bearer ${token}` },
          });
        }
        setHomeData(res1);
        setPlayerData(res2);
      } catch (error) {
        console.error("Failed to load home", error);
      } finally {
        setLoading(false);
      }
    };

    initializeData();
  }, [user, getToken]);

  if (loading || !homeData) return <Loading />;

  if (nav && nav === "findMatch") return <Navigate to="/matchMaking" />;
  if (nav && nav === "Practice") return <Navigate to="/Practice" />;

  return (
    <div className=" text-slate-900 min-h-screen p-4 md:p-8">
      <div className="flex flex-col max-w-6xl mx-auto space-y-6">
        {playerData ? (
          <div className="flex flex-row justify-between items-stretch gap-6">
            <div className="w-5/12 h-full">
              <Standard
                season={homeData.currentSeason}
                week={homeData.currentWeek}
                handleClick={handleClick}
              />
            </div>

            <div className="w-5/12 h-full">
              <PlayerCard player={playerData} />
            </div>
          </div>
        ) : (
          <div>
            <Welcome handleClick={handleClick} />
          </div>
        )}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-slate-900">
              Server Overview
            </h2>
          </div>
          <ServerStats stats={homeData} />
        </div>
        <div className="flex justify-between items-center">4</div>
        <div>5</div>
        <div>6</div>
      </div>
    </div>
  );
};

export default Home;
