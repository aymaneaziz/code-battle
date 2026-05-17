import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Sparkles,
  RefreshCw,
  Trophy,
  Skull,
  Handshake,
  Lightbulb,
  TrendingUp,
  Code2,
  AlertCircle,
} from "lucide-react";
import { Loading } from "@/components/common/Loading";
import { useAiFeedback } from "@/hooks/useAiFeedback";

const ScoreRing = ({ score }) => {
  const radius = 28;
  const circumference = 2 * Math.PI * radius;
  const filled = (score / 100) * circumference;
  const color = score >= 75 ? "#22c55e" : score >= 50 ? "#f59e0b" : "#ef4444";

  return (
    <div className="relative w-20 h-20 shrink-0">
      <svg width="80" height="80" className="-rotate-90" aria-hidden>
        <circle
          cx="40"
          cy="40"
          r={radius}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth="6"
        />
        <circle
          cx="40"
          cy="40"
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth="6"
          strokeDasharray={`${filled} ${circumference}`}
          strokeLinecap="round"
          style={{ transition: "stroke-dasharray 0.6s ease" }}
        />
      </svg>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <span className="text-lg font-black text-slate-800 leading-none">
          {score}
        </span>
        <span className="text-[9px] font-bold text-slate-400 uppercase">
          /100
        </span>
      </div>
    </div>
  );
};

const OutcomeIcon = ({ outcome }) => {
  if (outcome === "win")
    return <Trophy size={13} className="text-yellow-500 shrink-0" />;
  if (outcome === "loss")
    return <Skull size={13} className="text-red-500    shrink-0" />;
  return <Handshake size={13} className="text-slate-400  shrink-0" />;
};

const DIFFICULTY_COLOR = {
  Easy: "text-green-600  bg-green-50  border-green-200",
  Medium: "text-yellow-600 bg-yellow-50 border-yellow-200",
  Hard: "text-orange-600 bg-orange-50 border-orange-200",
  Extreme: "text-red-600    bg-red-50    border-red-200",
};

const Section = ({ icon: Icon, title, content, iconColor }) => {
  if (!content) return null;
  return (
    <div className="space-y-1.5">
      <div
        className={`flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest ${iconColor}`}
      >
        <Icon size={11} />
        {title}
      </div>
      <p className="text-xs text-slate-600 leading-relaxed">{content}</p>
    </div>
  );
};

export function AiFeedback() {
  const { feedback, lastMatch, loading, error, refresh } = useAiFeedback();

  if (loading) return <Loading />;

  if (!lastMatch) {
    return (
      <Card className="p-8 border border-slate-200 shadow-sm flex flex-col items-center gap-3 text-center">
        <div className="w-14 h-14 rounded-2xl bg-indigo-50 flex items-center justify-center">
          <Sparkles size={24} className="text-indigo-400" />
        </div>
        <p className="text-sm font-black text-slate-700">No battles yet</p>
        <p className="text-xs text-slate-400 max-w-xs leading-relaxed">
          Play your first ranked match to receive personalised AI coaching based
          on your performance.
        </p>
      </Card>
    );
  }

  if (error) {
    return (
      <Card className="p-6 border border-red-100 bg-red-50/30 shadow-sm space-y-3">
        <div className="flex items-center gap-2 text-red-500">
          <AlertCircle size={16} />
          <span className="text-sm font-bold">Couldn't load AI feedback</span>
        </div>
        <p className="text-xs text-slate-500">{error}</p>
        <Button
          size="sm"
          variant="outline"
          onClick={refresh}
          className="gap-1.5 cursor-pointer self-start"
        >
          <RefreshCw size={12} />
          Try again
        </Button>
      </Card>
    );
  }

  return (
    <Card className="p-6 border border-slate-200 shadow-sm space-y-5">
      {/* Header */}

      {/* Last match summary row */}
      <div className="flex items-start gap-4 p-3.5 bg-slate-50 rounded-xl border border-slate-100">
        {feedback && <ScoreRing score={feedback.score} />}

        <div className="flex-1 min-w-0">
          {/* Problem + outcome */}
          <div className="flex items-center gap-2 flex-wrap mb-1.5">
            <OutcomeIcon outcome={lastMatch.outcome} />
            <p className="text-xs font-black text-slate-800 truncate">
              {lastMatch.problemTitle ?? "Unknown Problem"}
            </p>
          </div>

          {/* Meta badges */}
          <div className="flex items-center gap-2 flex-wrap mb-2">
            {lastMatch.difficulty && (
              <Badge
                variant="outline"
                className={`text-[9px] font-bold px-1.5 py-0 ${DIFFICULTY_COLOR[lastMatch.difficulty] ?? ""}`}
              >
                {lastMatch.difficulty}
              </Badge>
            )}
            <span className="text-[10px] text-slate-400">
              {lastMatch.testsPassed ?? 0} tests passed
            </span>
            <span className="text-[10px] text-slate-300">·</span>
            <span className="text-[10px] text-slate-400">
              {lastMatch.submissions ?? 1} submission
              {lastMatch.submissions !== 1 ? "s" : ""}
            </span>
          </div>

          {/* One-line verdict */}
          {feedback?.summary && (
            <p className="text-[11px] text-slate-500 italic leading-relaxed">
              "{feedback.summary}"
            </p>
          )}
        </div>
        <Button
          size="sm"
          variant="ghost"
          onClick={refresh}
          className="h-7 w-7 p-0 text-slate-400 hover:text-indigo-500 cursor-pointer rounded-lg"
          title="Refresh feedback"
        >
          <RefreshCw size={13} />
        </Button>
      </div>

      {/* Feedback sections */}
      {feedback && (
        <div className="space-y-4 pt-1">
          <Section
            icon={Code2}
            title="Code Quality"
            content={feedback.quality}
            iconColor="text-blue-600"
          />
          <Section
            icon={TrendingUp}
            title="Optimization"
            content={feedback.optimization}
            iconColor="text-purple-600"
          />

          {feedback.suggestions.length > 0 && (
            <div className="space-y-2">
              <div className="flex items-center gap-1.5 text-[10px] font-black uppercase tracking-widest text-amber-600">
                <Lightbulb size={11} />
                Suggestions
              </div>
              <ul className="space-y-2">
                {feedback.suggestions.map((tip, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-2.5 text-xs text-slate-600"
                  >
                    <span className="shrink-0 w-4 h-4 rounded-full bg-amber-50 border border-amber-200 flex items-center justify-center text-[9px] font-black text-amber-600 mt-0.5">
                      {i + 1}
                    </span>
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </Card>
  );
}
