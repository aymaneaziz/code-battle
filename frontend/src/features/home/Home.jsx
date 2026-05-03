import React, { useEffect, useState } from "react";
import { useUser, useAuth } from "@clerk/clerk-react";
import api from "../../service/GlobalApi";
import { Loading } from "@/components/common/Loading";

import Standard from "./components/Standard";

const Home = () => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const [loading, setLoading] = useState(true);
  const [homeData, setHomeData] = useState(null);

  useEffect(() => {
    const initializeData = async () => {
      try {
        const token = await getToken();
        const res = await api.get("/home/data", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log(res);
        setHomeData(res);
      } catch (error) {
        console.error("Failed to load home", error);
      } finally {
        setLoading(false);
      }
    };

    initializeData();
  }, [user, getToken]);

  if (loading || !homeData) return <Loading />;

  return (
    <div className=" text-slate-900 min-h-screen p-4 md:p-8">
      <div className="flex flex-col max-w-6xl mx-auto space-y-6">
        <div className="flex flex-row justify-between items-center">
          <div className="w-5/12">
            <Standard
              season={homeData.currentSeason}
              week={homeData.currentWeek}
            />
          </div>
          <div className="w-5/12">
            <Standard
              season={homeData.currentSeason}
              week={homeData.currentWeek}
            />
          </div>
        </div>
        <div>3</div>
        <div className="flex justify-between items-center">4</div>
        <div>5</div>
        <div>6</div>
      </div>
    </div>
  );
};

export default Home;
