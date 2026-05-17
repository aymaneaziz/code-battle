import React, { useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock, Coins, Gem, Zap, CheckCircle2, Loader2 } from "lucide-react";
import { useAuth } from "@clerk/clerk-react";
import { fetchDailyChallenge } from "../services/challengeApi";
import { useNavigate } from "react-router-dom";

const DIFFICULTY_STYLES = {
  Easy: "bg-green-100 text-green-700   border-green-200  hover:bg-green-100",
  Medium: "bg-yellow-100 text-yellow-700 border-yellow-200 hover:bg-yellow-100",
  Hard: "bg-red-100 text-red-700       border-red-200    hover:bg-red-100",
  Extreme:
    "bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-100",
};

// ── timer th daily challenge  ──────────────────────────────────────────────────
function useMidnightCountdown() {
  const [label, setLabel] = useState("");

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      const next = new Date(
        Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate() + 1),
      );
      const diff = next - now;
      const h = Math.floor(diff / 3_600_000);
      const m = Math.floor((diff % 3_600_000) / 60_000);
      const s = Math.floor((diff % 60_000) / 1000);
      setLabel(
        `${String(h).padStart(2, "0")}:${String(m).padStart(2, "0")}:${String(s).padStart(2, "0")}`,
      );
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return label;
}

const DailyChallengeWidget = () => {
  const { getToken } = useAuth();
  const navigate = useNavigate();
  const countdown = useMidnightCountdown();

  const [daily, setDaily] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    getToken().then(async (token) => {
      try {
        const data = await fetchDailyChallenge(token);
        if (!cancelled) setDaily(data);
      } catch {
        console.error("Error loading daily challenge");
      } finally {
        if (!cancelled) setLoading(false);
      }
    });
    return () => {
      cancelled = true;
    };
  }, [getToken]);

  if (loading) {
    return (
      <Card className="shadow-sm border-slate-200 bg-white min-h-70 flex flex-col items-center justify-center p-6 gap-2">
        <Loader2 className="h-6 w-6 animate-spin text-slate-400" />
        <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          Loading Challenge...
        </span>
      </Card>
    );
  }
  if (!daily?.problemId) return null;

  const claimed = daily.rewardClaimed ?? false;

  return (
    <Card className="shadow-sm border-slate-200 bg-white flex flex-col">
      <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-slate-100">
        <CardTitle className="text-base font-extrabold tracking-tight text-slate-900">
          Daily Challenge
        </CardTitle>
        <div className="flex items-center gap-2">
          <div className="flex items-center text-slate-400 text-xs font-medium gap-1">
            <Clock className="w-3.5 h-3.5" />
            <span className="font-mono">{countdown}</span>
          </div>
          {claimed ? (
            <Badge className="bg-green-100 text-green-700 border-green-200 shadow-none flex items-center gap-1">
              <CheckCircle2 size={11} /> Claimed
            </Badge>
          ) : (
            <Badge className="bg-blue-100 text-blue-700 border-none shadow-none">
              New
            </Badge>
          )}
        </div>
      </CardHeader>

      <CardContent className="">
        <h3 className="text-sm font-bold text-slate-800 mb-2">
          {daily.problemId.title}
        </h3>
        <p className="text-sm text-slate-500 leading-relaxed line-clamp-3">
          {daily.problemId.description}
        </p>

        <div className="flex flex-wrap gap-2 mt-4">
          {/* Difficulty */}
          <Badge
            variant="outline"
            className={`font-semibold ${DIFFICULTY_STYLES[daily.problemId.difficulty] ?? ""}`}
          >
            {daily.problemId.difficulty}
          </Badge>

          {/* XP — tbdl chkl if claimed */}
          {daily.xp > 0 && (
            <Badge
              className={`flex items-center gap-1 px-2 py-1 rounded-full border ${claimed ? "bg-slate-50 text-slate-400 border-slate-200 line-through" : "bg-green-50 text-green-600 border-green-600"}`}
            >
              <Zap
                size={10}
                className={claimed ? "text-slate-300" : "fill-green-600"}
              />
              <span className="text-[10px] font-bold">+{daily.xp} XP</span>
            </Badge>
          )}

          {/* Coins — tbdl chkl if claimed */}
          {daily.reward?.coins > 0 && (
            <Badge
              className={`flex items-center gap-1 px-2 py-1 rounded-full border ${claimed ? "bg-slate-50 text-slate-400 border-slate-200 line-through" : "bg-amber-50 text-amber-600 border-amber-600"}`}
            >
              <Coins
                size={10}
                className={claimed ? "text-slate-300" : "fill-amber-600"}
              />
              <span className="text-[10px] font-bold">
                +{daily.reward.coins}
              </span>
            </Badge>
          )}

          {/* Gems — tbdl chkl if claimed */}
          {daily.reward?.gems > 0 && (
            <Badge
              className={`flex items-center gap-1 px-2 py-1 rounded-full border ${claimed ? "bg-slate-50 text-slate-400 border-slate-200 line-through" : "bg-indigo-50 text-indigo-600 border-indigo-600"}`}
            >
              <Gem
                size={10}
                className={claimed ? "text-slate-300" : "fill-indigo-600"}
              />
              <span className="text-[10px] font-bold">
                +{daily.reward.gems}
              </span>
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-0">
        <Button
          className="w-full font-bold shadow-sm cursor-pointer bg-blue-600 hover:bg-blue-700 text-white"
          onClick={() =>
            navigate(`/challenges/${daily.challengeId}`, {
              state: { fromVault: true },
            })
          }
        >
          {claimed ? "Play Again" : "Play Daily"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default DailyChallengeWidget;
