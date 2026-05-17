import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { AlertCircle } from "lucide-react";
import { PlayerPanel } from "./PlayerPanel";
import { MatchResultModal } from "@/features/match/components/MatchResultModal";
import wsClient from "@/service/wsClient";

export function VsScreen({ matchData, onMatchStarted }) {
  const navigate = useNavigate();
  const [countdown, setCountdown] = useState(10);
  const [matchResult, setMatchResult] = useState(null); // set if match ends during countdown

  const matchResultRef = useRef(null);
  const intervalRef = useRef(null);

  // Listen for MATCH_RESULT (covers: opponent surrendered during countdown)
  useEffect(() => {
    const onMatchResult = (data) => {
      // Stop countdown
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      // Tell useMatchmaking cleanup: do nothing (match is over)
      onMatchStarted();
      matchResultRef.current = data;
      setMatchResult(data);
    };

    wsClient.on("MATCH_RESULT", onMatchResult);
    return () => wsClient.off("MATCH_RESULT", onMatchResult);
  }, [onMatchStarted]);

  // Countdown → navigate to match
  useEffect(() => {
    if (!matchData) return;

    intervalRef.current = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          intervalRef.current = null;

          // Don't navigate if match already ended (e.g. opponent left)
          if (!matchResultRef.current) {
            onMatchStarted(); // set isCancellingRef = true before unmount
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
      {/* Shown if opponent leaves during countdown */}
      <MatchResultModal
        open={!!matchResult}
        result={matchResult}
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
