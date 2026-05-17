import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import wsClient from "@/service/wsClient";

export function useMatchmaking(userId) {
  const navigate = useNavigate();
  const [status, setStatus] = useState("searching"); // "searching" | "found"
  const [matchData, setMatchData] = useState(null); // { matchId, you, opponent }

  // Ref b7al state bs7 mkdirch 3la re-render, ghadi tkhlli lstatus w isCancelling kaynin b7al ma homa f kol wa9t
  const statusRef = useRef("searching");
  const matchDataRef = useRef(null);
  const isCancellingRef = useRef(false);
  const userIdRef = useRef(userId);

  useEffect(() => {
    userIdRef.current = userId;
  }, [userId]);

  const updateStatus = (next) => {
    statusRef.current = next;
    setStatus(next);
  };

  useEffect(() => {
    const onQueued = () => updateStatus("searching");

    const onMatchFound = (data) => {
      matchDataRef.current = data;
      setMatchData(data);
      updateStatus("found");
      // Navigate after 8s countdown (done in VsScreen)
    };

    const onError = (data) => {
      console.error("[Matchmaking]", data.message);
    };

    wsClient.on("QUEUED", onQueued);
    wsClient.on("MATCH_FOUND", onMatchFound);
    wsClient.on("ERROR", onError);

    return () => {
      wsClient.off("QUEUED", onQueued);
      wsClient.off("MATCH_FOUND", onMatchFound);
      wsClient.off("ERROR", onError);

      if (isCancellingRef.current) return;

      // Use ref value — never null even if userId prop hasn't resolved
      const uid = userIdRef.current;
      if (!uid) return;

      // handle all surrender/disconnect scenarios.
      if (statusRef.current === "searching") {
        wsClient.send({ type: "LEAVE_QUEUE", userId: uid });
      } else if (statusRef.current === "found" && matchDataRef.current) {
        // Left during VsScreen countdown — send SURRENDER
        const { matchId, opponent } = matchDataRef.current;
        wsClient.send({
          type: "SURRENDER",
          matchId,
          userId: uid,
          opponentId: opponent.userId,
        });
      }
    };
  }, []);

  const cancelSearch = () => {
    isCancellingRef.current = true; // bach nblokiw double cancel
    const uid = userIdRef.current;
    if (uid) {
      wsClient.send({ type: "LEAVE_QUEUE", userId: uid });
    }
    navigate("/");
  };
  const markMatchStarted = () => {
    isCancellingRef.current = true;
  };

  return { status, matchData, cancelSearch, markMatchStarted };
}
