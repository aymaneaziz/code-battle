import { useMatchmaking } from "./hooks/useMatchmaking";
import { SearchingView } from "./components/SearchingView";
import { VsScreen } from "./components/VsScreen";
import { useUserId } from "@/hooks/useUserId";
import { useEffect } from "react";
import wsClient from "@/service/wsClient";

const MatchMaking = () => {
  const userId = useUserId();
  const { status, matchData, cancelSearch, markMatchStarted } =
    useMatchmaking(userId);

  return (
    <div className="min-h-screen bg-slate-50 p-4 md:p-8">
      {status === "searching" && <SearchingView onCancel={cancelSearch} />}
      {status === "found" && (
        <VsScreen matchData={matchData} onMatchStarted={markMatchStarted} />
      )}
    </div>
  );
};

export default MatchMaking;
