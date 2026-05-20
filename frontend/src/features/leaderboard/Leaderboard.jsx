import { getToken } from "@clerk/react";
import { useEffect, useState, useRef } from "react";
import { Loading } from "@/components/common/Loading";
import { Card } from "@/components/ui/card";
import { Table, TableBody } from "@/components/ui/table";

import getSystemInfo from "./services/getSystemInfo";

import Header from "./components/Header";
import GlobalRank from "./components/GlobalRank";
import getGlobalRank from "./services/getGlobalRank";
import getMyGlobalRank from "./services/getMyGlobalRank";
import PlayerRow from "./components/PlayerRow";

export const Leaderboard = () => {
  const [loading, setLoading] = useState(true);
  const [systemData, setSystemData] = useState({
    currentSeason: 0,
    currentWeek: 0,
    lastLeatherboardUpdate: null,
  });

  const [topthree, setTopthree] = useState([]);
  const [globalRank, setGlobalRank] = useState(null);
  const [myRank, setMyRank] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = await getToken();
        if (!token) {
          console.error("No token found");
          return;
        }

        const [systemData, globalRank, myRank] = await Promise.all([
          getSystemInfo(),
          getGlobalRank(),
          getMyGlobalRank(token),
        ]);

        const topThree = globalRank.slice(0, 3);

        setGlobalRank(globalRank);
        setTopthree(topThree);
        setMyRank(myRank);
        setSystemData({
          currentSeason: systemData.currentSeason,
          currentWeek: systemData.currentWeek,
          lastLeatherboardUpdate: systemData.lastLeatherboardUpdate,
        });

        console.log("myRank Data:", myRank);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [getToken]);

  if (loading) return <Loading />;

  return (
    <div className="min-h-screen bg-slate-50/50 text-slate-900 p-6 md:p-8 font-sans flex flex-col gap-5">
      {/* Header */}
      <Card className="w-full px-6 py-4 flex items-center shadow-sm border border-slate-200 rounded-2xl">
        <Header system={systemData} />
      </Card>

      {/* Global rankings table */}
      <Card className="w-full p-0 shadow-sm border border-slate-200 rounded-2xl overflow-hidden">
        <GlobalRank data={globalRank} />
      </Card>

      {/* My position */}
      <Card className="w-full px-6 py-4 shadow-sm border border-slate-200 rounded-2xl">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-xs font-bold text-blue-600 bg-blue-50 border border-blue-100 rounded-lg px-3 py-1 uppercase tracking-widest">
            Your Position
          </span>
        </div>
        <Table className="w-full">
          <TableBody>
            <PlayerRow player={myRank} />
          </TableBody>
        </Table>
      </Card>
    </div>
  );
};
