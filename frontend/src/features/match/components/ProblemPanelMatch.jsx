import React from "react";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";

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
    {difficulty || "Unknown"}
  </Badge>
);

// ─── Format Helpers ───────────────────────────────────────────────────────────
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

const formatConstraint = (val) => {
  if (val !== null && typeof val === "object") {
    const parts = [];
    if (val.min !== undefined) parts.push(`min: ${val.min}`);
    if (val.max !== undefined) parts.push(`max: ${val.max}`);
    return parts.join(", ");
  }
  return String(val);
};

// ─── Main Component ───────────────────────────────────────────────────────────
const ProblemPanelMatch = ({ problem }) => {
  if (!problem)
    return <div className="p-4 text-slate-500">Loading problem...</div>;

  const hasConstraints =
    problem.constraints &&
    (Array.isArray(problem.constraints)
      ? problem.constraints.length > 0
      : Object.keys(problem.constraints).length > 0);

  return (
    <ScrollArea className="h-full w-full bg-white rounded-xl">
      <div className="p-4 space-y-4">
        {/* ── Title + badges ──────────────────────────────────────────────── */}
        <div>
          <h1 className="text-2xl font-extrabold text-slate-900 mb-3 leading-tight">
            {problem.title}
          </h1>
          <div className="flex flex-wrap gap-2">
            <DifficultyBadge difficulty={problem.difficulty} />

            {problem.category && (
              <Badge
                variant="secondary"
                className="bg-slate-100 text-slate-600"
              >
                {problem.category}
              </Badge>
            )}
          </div>
        </div>

        {/* ── Description ─────────────────────────────────────────────────── */}
        <div className="space-y-3">
          <h3 className="text-[11px] font-black uppercase text-slate-800">
            Description :
          </h3>
          <div className="prose prose-slate max-w-none prose-p:leading-relaxed text-sm text-slate-600">
            {problem.description ? (
              <div dangerouslySetInnerHTML={{ __html: problem.description }} />
            ) : (
              <p>No description available.</p>
            )}
          </div>
        </div>

        {/* ── Examples ────────────────────────────────────────────────────── */}
        {problem.examples && problem.examples.length > 0 && (
          <div className="space-y-4">
            <h3 className="text-[11px] font-black uppercase text-slate-800">
              Example Cases :
            </h3>
            {problem.examples.map((ex, i) => (
              <div
                key={i}
                className="bg-slate-50/80 rounded-xl p-4 border border-slate-100 font-mono text-[12px] space-y-2"
              >
                {/* Input */}
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
        )}

        {/* ── Constraints ─────────────────────────────────────────────────── */}
        {hasConstraints && (
          <div className="space-y-3">
            <h3 className="text-[11px] font-black uppercase text-slate-800">
              Constraints :
            </h3>
            <div className="bg-amber-50/50 border border-amber-100 p-4 rounded-xl">
              <ul className="list-disc list-inside text-xs text-amber-800 space-y-1 font-medium italic">
                {Array.isArray(problem.constraints)
                  ? // Array format handling
                    problem.constraints.map((constraint, idx) => (
                      <li key={idx}>{constraint}</li>
                    ))
                  : // Object format handling
                    Object.entries(problem.constraints).map(([k, v]) => (
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
    </ScrollArea>
  );
};

export default ProblemPanelMatch;
