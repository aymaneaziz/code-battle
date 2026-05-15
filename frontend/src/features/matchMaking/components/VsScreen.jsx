import { useEffect, useRef, useState } from "react";
import { useBlocker, useNavigate } from "react-router-dom";

import { Card } from "@/components/ui/card";
import { PlayerPanel } from "./PlayerPanel";
import { WinModal } from "@/features/match/components/winModal";
import wsClient from "@/service/wsClient";
import { AlertCircle } from "lucide-react";

export function VsScreen({ matchData, onMatchStarted }) {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(3); // 10 second countdown before navigating to Match screen

  const [showWinModal, setShowWinModal] = useState(false);

  const showWinModalRef = useRef(false);
  const intervalRef = useRef(null);

  // Listen for opponent surrendering during the countdown
  useEffect(() => {
    const handleOpponentSurrendered = () => {
      // Stop the countdown timer
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      // Mark as normal exit so useMatchmaking cleanup does nothing
      onMatchStarted();
      showWinModalRef.current = true;
      setShowWinModal(true);
    };

    wsClient.on("OPPONENT_SURRENDERED", handleOpponentSurrendered);
    return () =>
      wsClient.off("OPPONENT_SURRENDERED", handleOpponentSurrendered);
  }, [onMatchStarted]);

  // Countdown timer to navigate to Match screen after 8 seconds
  useEffect(() => {
    if (!matchData) return;
    intervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;

          if (!showWinModalRef.current) {
            onMatchStarted();
            navigate(`/match/${matchData.matchId}`, {
              state: {
                fromMatchmaking: true,
                opponentId: matchData.opponent.userId,
                problem: matchData.problem,
                you: matchData.you,
                opponent: matchData.opponent,
              },
              replace: true,
            });
          }
        }
        return prev - 1;
      });
    }, 1000);
    return () => {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    };
  }, [matchData, navigate]);

  if (!matchData) return null;

  return (
    <>
      <WinModal
        open={showWinModal}
        onClose={() => navigate("/", { replace: true })}
      />

      <div className="flex flex-col items-center justify-center min-h-[70vh] gap-8 p-4">
        <h2 className="text-sm uppercase tracking-widest font-bold text-slate-400">
          Match Found!
        </h2>

        <Card className="w-full max-w-2xl p-8 border border-slate-200 rounded-2xl shadow-sm bg-white">
          <div className="flex items-center justify-between gap-4">
            <PlayerPanel player={matchData.you} label="You" />

            <div className="flex flex-col items-center gap-4 px-4 shrink-0">
              <div className="flex flex-col items-center">
                <span className="text-4xl font-black text-slate-200 tracking-tighter leading-none">
                  VS
                </span>
                <span className="text-5xl font-black text-indigo-600 tabular-nums tracking-tighter">
                  {countdown}
                </span>
              </div>

              {/* Fixed and Styled Warning Section */}
              <div className="flex flex-col items-center gap-1">
                <div className="flex items-center gap-1.5 text-[10px] font-bold text-red-500 uppercase tracking-tight bg-red-50 px-3 py-1 rounded-full border border-red-100 animate-pulse">
                  <AlertCircle className="w-3 h-3" />
                  <span>No Forfeit Zone</span>
                </div>
                <p className="text-[11px] font-medium text-slate-500 text-center max-w-35 leading-tight">
                  Leaving now means{" "}
                  <span className="text-red-600 font-bold">forfeit</span> –
                  opponent wins!
                </p>
              </div>

              <p className="text-[10px] uppercase font-bold text-slate-300 tracking-widest">
                Preparing Arena...
              </p>
            </div>

            <PlayerPanel player={matchData.opponent} label="Opponent" />
          </div>
        </Card>
      </div>
    </>
  );
}
