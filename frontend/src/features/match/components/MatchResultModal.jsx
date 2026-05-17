import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import putMissionProgress from "@/service/putMissionProgress";
import { useAuth } from "@clerk/clerk-react";
import {
  Trophy,
  Skull,
  Handshake,
  Home,
  TrendingUp,
  TrendingDown,
  Minus,
  Zap,
  Coins,
  Gem,
} from "lucide-react";
import { useEffect } from "react";

// ── Reason label ──────────────────────────────────────────────────────────────
const REASON_LABEL = {
  all_tests_passed: "All test cases passed",
  hp_zero: "HP reached zero",
  time_expired: "Time ran out",
  surrender: "Your opponent has surrendered",
};

// ── Outcome config ────────────────────────────────────────────────────────────
const OUTCOME_CONFIG = {
  win: {
    icon: <Trophy className="w-10 h-10 text-yellow-500" />,
    bg: "bg-yellow-50",
    ring: "ring-yellow-200",
    title: "Victory!",
    titleColor: "text-yellow-600",
    badge: "bg-yellow-100 text-yellow-700 border-yellow-200",
    animation: "animate-bounce",
  },
  loss: {
    icon: <Skull className="w-10 h-10 text-red-500" />,
    bg: "bg-red-50",
    ring: "ring-red-200",
    title: "Defeat",
    titleColor: "text-red-600",
    badge: "bg-red-100 text-red-700 border-red-200",
    animation: "",
  },
  draw: {
    icon: <Handshake className="w-10 h-10 text-slate-500" />,
    bg: "bg-slate-50",
    ring: "ring-slate-200",
    title: "Draw",
    titleColor: "text-slate-600",
    badge: "bg-slate-100 text-slate-700 border-slate-200",
    animation: "",
  },
};

// ── XP Breakdown row ──────────────────────────────────────────────────────────
const XpRow = ({ label, value, positive = true }) => (
  <div className="flex items-center justify-between text-xs py-0.5">
    <span className="text-slate-500">{label}</span>
    <span
      className={`font-black ${positive ? "text-green-600" : "text-red-500"}`}
    >
      {positive ? "+" : ""}
      {value} XP
    </span>
  </div>
);

// ── ELO delta badge ───────────────────────────────────────────────────────────
const EloBadge = ({ delta, oldElo, newElo }) => {
  const positive = delta >= 0;
  const Icon = delta > 0 ? TrendingUp : delta < 0 ? TrendingDown : Minus;
  return (
    <div
      className={`flex items-center gap-2 px-4 py-2 rounded-xl border font-bold text-sm
      ${
        positive
          ? "bg-green-50 border-green-200 text-green-700"
          : "bg-red-50 border-red-200 text-red-700"
      }`}
    >
      <Icon size={16} />
      <span>
        {positive ? "+" : ""}
        {delta} ELO
      </span>
      <span className="text-slate-400 font-normal text-xs">
        ({oldElo} → {newElo})
      </span>
    </div>
  );
};

// ── Rewards row (coins + gems) ────────────────────────────────────────────────
const RewardsRow = ({ coins, gems }) => {
  if (!coins && !gems) return null;
  return (
    <div className="flex items-center justify-center gap-4 py-2">
      {coins > 0 && (
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-amber-50 border border-amber-500 rounded-xl">
          <Coins size={15} className="text-amber-700" />
          <span className="text-sm font-black text-amber-700">
            +{coins} Coins
          </span>
        </div>
      )}
      {gems > 0 && (
        <div className="flex items-center gap-1.5 px-3 py-1.5 bg-purple-50 border border-indigo-500 rounded-xl">
          <Gem size={15} className="text-indigo-700" />
          <span className="text-sm font-black text-indigo-700">
            +{gems} Gems
          </span>
        </div>
      )}
    </div>
  );
};

// ── Main modal ────────────────────────────────────────────────────────────────
export function MatchResultModal({ open, result, onClose }) {
  if (!result) return null;

  const {
    outcome,
    reason,
    eloDelta,
    oldElo,
    newElo,
    xpEarned,
    xpBreakdown,
    coinsEarned = 0,
    gemsEarned = 0,
  } = result;
  const cfg = OUTCOME_CONFIG[outcome] ?? OUTCOME_CONFIG.draw;

  const bonusEntries = Object.entries(xpBreakdown?.bonuses ?? {});
  const penaltyEntries = Object.entries(xpBreakdown?.penalties ?? {});
  const { getToken } = useAuth();

  useEffect(() => {
    const hasPlayedMatch = async () => {
      try {
        const token = await getToken();
        if (!token) {
          console.warn("No auth token available for mission progress update.");
          return;
        }

        console.log("Updating mission progress for PLAY_MATCH...");
        await putMissionProgress(token, "PLAY_MATCH");
        if (outcome === "win") await putMissionProgress(token, "WIN_MATCH");
      } catch (error) {
        console.error(
          "Failed to update mission progress for PLAY_MATCH:",
          error
        );
      }
    };
    hasPlayedMatch();
  }, []);

  return (
    <AlertDialog open={open}>
      <AlertDialogContent className="bg-white border-slate-200 shadow-2xl max-w-md p-0 overflow-hidden">
        {/* ── Top colour band ──────────────────────────────────────────── */}
        <div
          className={`${cfg.bg} flex flex-col items-center gap-3 pt-8 pb-6 px-6 border-b border-slate-100`}
        >
          <div
            className={`w-20 h-20 rounded-full flex items-center justify-center ring-4 ${cfg.ring} ${cfg.bg} ${cfg.animation}`}
          >
            {cfg.icon}
          </div>

          <AlertDialogHeader className="items-center text-center gap-1 p-0">
            <AlertDialogTitle
              className={`w-full text-center text-3xl font-black tracking-tighter uppercase ${cfg.titleColor}`}
            >
              {cfg.title}
            </AlertDialogTitle>
            <AlertDialogDescription className="text-slate-500 text-sm">
              {REASON_LABEL[reason] ?? reason}
            </AlertDialogDescription>
          </AlertDialogHeader>
          {/* ELO */}
          <EloBadge delta={eloDelta} oldElo={oldElo} newElo={newElo} />
          {/* Coins + Gems */}
          <RewardsRow coins={coinsEarned} gems={gemsEarned} />
        </div>

        {/* ── XP Breakdown ─────────────────────────────────────────────── */}
        <div className="px-6 py-4 flex flex-col gap-3">
          {/* Base */}
          <div className="flex items-center justify-between text-xs pb-1 border-b border-slate-100">
            <span className="text-slate-400 font-bold uppercase tracking-wider">
              Base XP
            </span>
            <span className="font-black text-slate-700">
              +{xpBreakdown?.base ?? 0} XP
            </span>
          </div>

          {/* Bonuses */}
          {bonusEntries.length > 0 && (
            <div className="flex flex-col gap-0.5">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                Bonuses
              </span>
              {bonusEntries.map(([key, val]) => (
                <XpRow key={key} label={formatKey(key)} value={val} positive />
              ))}
            </div>
          )}

          {/* Multiplier */}
          {xpBreakdown?.multiplier && xpBreakdown.multiplier > 1 && (
            <div className="flex items-center justify-between text-xs py-1 border-t border-slate-100">
              <span className="flex items-center gap-1.5 text-purple-600 font-bold">
                <Zap size={12} className="fill-purple-600" />
                Combo Multiplier
              </span>
              <span className="font-black text-purple-600">
                ×{xpBreakdown.multiplier}
              </span>
            </div>
          )}

          {/* Penalties */}
          {penaltyEntries.length > 0 && (
            <div className="flex flex-col gap-0.5 border-t border-slate-100 pt-2">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-1">
                Penalties
              </span>
              {penaltyEntries.map(([key, val]) => (
                <div
                  key={key}
                  className="flex items-center justify-between text-xs py-0.5"
                >
                  <span className="text-slate-500">{formatKey(key)}</span>
                  <span className="font-black text-red-500">{val}</span>
                </div>
              ))}
            </div>
          )}

          {/* Total */}
          <div className="flex items-center justify-between bg-indigo-50 border border-indigo-100 rounded-xl px-4 py-3 mt-1">
            <span className="text-sm font-black text-indigo-700 uppercase tracking-wide">
              Total XP Earned
            </span>
            <span className="text-xl font-black text-indigo-600">
              +{xpEarned}
            </span>
          </div>
        </div>

        {/* ── Footer ───────────────────────────────────────────────────── */}
        <AlertDialogFooter className="px-6 pb-6 pt-0 justify-center">
          <AlertDialogAction
            onClick={onClose}
            className="bg-indigo-600 hover:bg-indigo-700 text-white font-black px-10 py-5 rounded-xl flex items-center gap-2 cursor-pointer w-full justify-center"
          >
            <Home size={16} />
            Back to Home
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

// ── Helpers ───────────────────────────────────────────────────────────────────
function formatKey(key) {
  return key
    .replace(/([A-Z])/g, " $1")
    .replace(/^./, (s) => s.toUpperCase())
    .trim();
}
