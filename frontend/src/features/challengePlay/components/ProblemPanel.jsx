import React from "react";
import { Badge } from "@/components/ui/badge";
import { Zap, Trophy, Coins, Gem } from "lucide-react";

// ─── Difficulty badge ─────────────────────────────────────────────────────────
const DIFFICULTY_STYLES = {
  Easy: "bg-green-100  text-green-700  border-green-200  hover:bg-green-100",
  Medium: "bg-yellow-100 text-yellow-700 border-yellow-200 hover:bg-yellow-100",
  Hard: "bg-red-100    text-red-700    border-red-200    hover:bg-red-100",
  Extreme:
    "bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-100",
};

const DifficultyBadge = ({ difficulty }) => (
  <Badge
    variant="outline"
    className={`font-semibold ${DIFFICULTY_STYLES[difficulty] ?? DIFFICULTY_STYLES.Easy}`}
  >
    {difficulty}
  </Badge>
);

const formatInputValue = (val) => {
  if (Array.isArray(val)) return JSON.stringify(val);
  if (val !== null && typeof val === "object") return JSON.stringify(val);
  return String(val ?? "");
};

const InputDisplay = ({ input }) => {
  if (input === null || input === undefined)
    return <span className="text-slate-500">—</span>;

  // Object with named keys → render each key on its own line
  if (typeof input === "object" && !Array.isArray(input)) {
    return (
      <div className="flex flex-col gap-0.5">
        {Object.entries(input).map(([k, v]) => (
          <div key={k} className="flex items-baseline gap-2">
            <span className="text-blue-500 font-bold">{k}</span>
            <span className="text-slate-400">=</span>
            <span className="text-slate-800">{formatInputValue(v)}</span>
          </div>
        ))}
      </div>
    );
  }

  return <span className="text-slate-800">{formatInputValue(input)}</span>;
};

// ─── Constraint value ─────────────────────────────────────────────────────────
const formatConstraint = (val) => {
  if (val !== null && typeof val === "object") {
    const parts = [];
    if (val.min !== undefined) parts.push(`min: ${val.min}`);
    if (val.max !== undefined) parts.push(`max: ${val.max}`);
    return parts.join(", ");
  }
  return String(val);
};

// ─── ProblemPanel ─────────────────────────────────────────────────────────────

const ProblemPanel = ({ challenge }) => {
  const { problemId, xp, reward } = challenge;

  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm h-full flex flex-col overflow-hidden">
      <div className="p-6 overflow-y-auto space-y-8">
        {/* ── Title + badges ──────────────────────────────────────────────── */}
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 mb-3 leading-tight">
            {problemId.title}
          </h1>
          <div className="flex flex-wrap gap-2">
            <DifficultyBadge difficulty={problemId.difficulty} />

            {xp > 0 && (
              <Badge className="flex items-center gap-1 px-2 py-1 bg-green-50 text-green-600 rounded-full border border-green-600">
                <Zap size={10} className="fill-green-600" />
                <span className="text-[10px] font-bold uppercase">
                  +{xp} XP
                </span>
              </Badge>
            )}
            {reward?.coins > 0 && (
              <Badge className="flex items-center gap-1.5 px-2 py-1 bg-amber-50 text-amber-600 rounded-full border border-amber-600">
                <Coins size={10} className="fill-amber-600" />
                <span className="text-[10px] font-bold uppercase">
                  +{reward.coins} Coins
                </span>
              </Badge>
            )}
            {reward?.gems > 0 && (
              <Badge className="flex items-center gap-1.5 px-2 py-1 bg-indigo-50 text-indigo-600 rounded-full border border-indigo-600">
                <Gem size={10} className="fill-indigo-600" />
                <span className="text-[10px] font-bold uppercase">
                  +{reward.gems} Gems
                </span>
              </Badge>
            )}
          </div>
        </div>

        {/* ── Description ─────────────────────────────────────────────────── */}
        <div className="space-y-3">
          <h3 className="text-[11px] font-black uppercase text-slate-800">
            Description :
          </h3>
          <p className="text-slate-600 text-sm leading-relaxed whitespace-pre-wrap">
            {problemId.description}
          </p>
        </div>

        {/* ── Examples ────────────────────────────────────────────────────── */}
        <div className="space-y-4">
          <h3 className="text-[11px] font-black uppercase text-slate-800">
            Example Cases :
          </h3>
          {problemId.examples.map((ex, i) => (
            <div
              key={i}
              className="bg-slate-50/80 rounded-xl p-4 border border-slate-100 font-mono text-[12px] space-y-2"
            >
              {/* Input — clean key/value display */}
              <div className="flex gap-2 items-start">
                <span className="text-blue-600 font-black shrink-0">
                  INPUT:
                </span>
                <div className="text-slate-800">
                  <InputDisplay input={ex.input} />
                </div>
              </div>

              {/* Output */}
              <div className="flex gap-2 items-baseline">
                <span className="text-green-600 font-black shrink-0">
                  OUTPUT:
                </span>
                <span className="text-slate-800">
                  {formatInputValue(ex.output)}
                </span>
              </div>

              {/* Explanation */}
              {ex.explanation && (
                <div className="text-slate-500 pt-1 italic border-t border-slate-200 mt-2 text-[11px]">
                  // {ex.explanation}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* ── Constraints ─────────────────────────────────────────────────── */}
        {problemId.constraints && (
          <div className="space-y-3">
            <h3 className="text-[11px] font-black uppercase text-slate-800">
              Constraints :
            </h3>
            <div className="bg-amber-50/50 border border-amber-100 p-4 rounded-xl">
              <ul className="list-disc list-inside text-xs text-amber-800 space-y-1 font-medium italic">
                {Object.entries(problemId.constraints).map(([k, v]) => (
                  <li key={k}>
                    <span className="font-bold not-italic">{k}:</span>{" "}
                    {formatConstraint(v)}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProblemPanel;
