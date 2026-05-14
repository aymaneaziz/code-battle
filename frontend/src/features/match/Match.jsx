import { useEffect, useRef, useState } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Swords } from "lucide-react";
import { useUserId } from "@/hooks/useUserId";
import wsClient from "@/service/wsClient";
import { SurrenderButton } from "./components/SurrenderButton";
import { WinModal } from "./components/winModal";

export const Match = () => {
  const { matchId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const userId = useUserId();

  // Passed via navigate state from VsScreen
  const opponentId = location.state?.opponentId;

  const [showWinModal, setShowWinModal] = useState(false);

  //  Refs to track if the match has already ended, to prevent double-sending SURRENDER
  const hasSurrenderedRef = useRef(false);
  const matchEndedRef = useRef(false);

  useEffect(() => {
    if (!userId || !opponentId) return;

    // Push a fake history entry so back button can be intercepted
    window.history.pushState(null, null, window.location.pathname);

    // Listen for Opponent surrendering
    const handleOpponentSurrendered = () => {
      matchEndedRef.current = true;
      setShowWinModal(true);
    };

    // Prevent accidental Tab Close / Refresh
    const handleBeforeUnload = (e) => {
      e.preventDefault();
      e.returnValue = "";
    };

    // Prevent Back Button
    const handlePopState = () => {
      const confirmed = window.confirm(
        "Leaving now counts as a surrender. Proceed?",
      );
      if (confirmed) {
        handleSurrender();
      } else {
        window.history.pushState(null, null, window.location.pathname);
      }
    };

    wsClient.on("OPPONENT_SURRENDERED", handleOpponentSurrendered);
    window.addEventListener("beforeunload", handleBeforeUnload);
    window.addEventListener("popstate", handlePopState);

    // This runs if the user navigates away via React Router (links, URL change)
    return () => {
      wsClient.off("OPPONENT_SURRENDERED", handleOpponentSurrendered);
      window.removeEventListener("beforeunload", handleBeforeUnload);
      window.removeEventListener("popstate", handlePopState);

      // Only send SURRENDER on unmount if neither side already ended the match.
      if (!hasSurrenderedRef.current && !matchEndedRef.current) {
        wsClient.send({ type: "SURRENDER", matchId, userId, opponentId });
      }
    };
  }, [matchId, userId, opponentId]);

  const handleSurrender = () => {
    hasSurrenderedRef.current = true; // Block cleanup from double-sending
    wsClient.send({ type: "SURRENDER", matchId, userId, opponentId });
    navigate("/", { replace: true });
  };

  const handleWinModalClose = () => {
    setShowWinModal(false);
    navigate("/", { replace: true });
  };

  return (
    <>
      {/* Victory popup for the player whose opponent surrendered */}
      <WinModal open={showWinModal} onClose={handleWinModalClose} />

      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-8">
        <Card className="w-full max-w-2xl p-10 rounded-2xl border border-slate-200 shadow-sm flex flex-col items-center gap-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-indigo-50 flex items-center justify-center">
            <Swords className="w-8 h-8 text-indigo-500" />
          </div>

          <div className="space-y-2">
            <h1 className="text-2xl font-black tracking-tighter text-slate-900 uppercase">
              Match <span className="text-indigo-500">In Progress</span>
            </h1>
            <p className="text-slate-400 text-sm">Fight to the end!</p>
          </div>

          <Badge variant="outline" className="font-mono text-xs text-slate-400">
            {matchId}
          </Badge>

          <div className="w-full h-px bg-slate-100" />

          <SurrenderButton onSurrender={handleSurrender} />
        </Card>
      </div>
    </>
  );
};
