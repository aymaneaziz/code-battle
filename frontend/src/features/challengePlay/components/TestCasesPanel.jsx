import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Play, Send, X, FlaskConical } from "lucide-react";

// ─── Helpers ──────────────────────────────────────────────────────────────────
const formatValue = (val) => {
  if (val === undefined || val === null) return "";
  return typeof val === "object" ? JSON.stringify(val) : String(val);
};

const tryParse = (raw) => {
  try {
    return JSON.parse(raw);
  } catch {
    return raw;
  }
};

const TestCasesPanel = ({
  testCases,
  setTestCases,
  onRun,
  onSubmit,
  loading,
}) => {
  const [activeTab, setActiveTab] = useState("0");

  // ── Add custom case ─────────────────────────────────────────────────────────
  const addCase = () => {
    const baseInput = testCases[0]?.input ?? {};
    const emptyInput =
      typeof baseInput === "object"
        ? Object.keys(baseInput).reduce((acc, k) => ({ ...acc, [k]: "" }), {})
        : "";

    const newCase = {
      testCaseId: `custom-${Date.now()}`,
      input: emptyInput,
      output: "",
      isCustom: true,
    };
    setTestCases([...testCases, newCase]);
    setActiveTab(String(testCases.length));
  };

  // ── Remove custom case ──────────────────────────────────────────────────────
  const removeCase = (e, idx) => {
    e.stopPropagation();
    const next = testCases.filter((_, i) => i !== idx);
    const active = parseInt(activeTab);
    setTestCases(next);
    if (active === idx) setActiveTab(String(Math.max(0, idx - 1)));
    else if (active > idx) setActiveTab(String(active - 1));
  };

  // ── Update a key inside the input object of the active custom case ──────────
  const updateInputKey = (key, raw) => {
    const idx = parseInt(activeTab);
    const updated = [...testCases];
    updated[idx] = {
      ...updated[idx],
      input: { ...updated[idx].input, [key]: tryParse(raw) },
    };
    setTestCases(updated);
  };

  // ── Update expected output of the active custom case ───────────────────────
  const updateOutput = (raw) => {
    const idx = parseInt(activeTab);
    const updated = [...testCases];
    updated[idx] = { ...updated[idx], output: tryParse(raw) };
    setTestCases(updated);
  };

  const currentCase = testCases[parseInt(activeTab)];

  // Build input rows: each key of the input object becomes one labeled row
  const inputEntries = currentCase
    ? typeof currentCase.input === "object" && currentCase.input !== null
      ? Object.entries(currentCase.input)
      : [["input", currentCase.input]]
    : [];

  return (
    <div className="flex flex-col bg-white">
      {/* ── Action bar ────────────────────────────────────────────────────── */}
      <div className="px-4 py-3 border-b border-slate-100 flex items-center gap-2 bg-slate-50/50 shrink-0">
        <Button
          onClick={onSubmit}
          disabled={loading}
          className="bg-green-600 hover:bg-green-700 h-8 font-bold text-xs cursor-pointer"
        >
          <Send size={13} className="mr-1.5" />
          {loading ? "Sending…" : "Submit"}
        </Button>
        <Button
          onClick={onRun}
          disabled={loading}
          variant="outline"
          className="text-blue-600 h-8 font-bold text-xs cursor-pointer"
        >
          <Play size={13} className="mr-1.5 fill-blue-600" />
          Run
        </Button>
      </div>

      {/* ── Body ──────────────────────────────────────────────────────────── */}
      <div className="flex flex-col p-4 gap-3">
        {/* Tab strip */}
        <div className="flex items-center justify-between shrink-0">
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar bg-slate-100 p-1 rounded-lg">
            {testCases.map((tc, idx) => {
              const isActive = activeTab === String(idx);
              return (
                <div
                  key={idx}
                  onClick={() => setActiveTab(String(idx))}
                  className={`flex items-center text-[10px] font-bold px-3 py-1.5 rounded-md group cursor-pointer transition-all whitespace-nowrap ${
                    isActive
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
                  }`}
                >
                  {tc.isCustom ? `Custom ${idx + 1}` : `Case ${idx + 1}`}
                  {tc.isCustom && (
                    <button
                      type="button"
                      onClick={(e) => removeCase(e, idx)}
                      className="ml-2 flex items-center justify-center rounded-full hover:bg-red-100 hover:text-red-600 text-slate-400 opacity-0 group-hover:opacity-100 transition-all p-0.5"
                    >
                      <X size={10} strokeWidth={3} />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
          <button
            onClick={addCase}
            className="text-blue-600 font-bold text-[11px] flex items-center cursor-pointer ml-4 shrink-0"
          >
            <Plus size={13} className="mr-1" /> Add Custom
          </button>
        </div>

        {/* Case content — grows to fill  */}
        {currentCase ? (
          <div className="flex flex-col gap-3">
            {/* Input: one row per argument key */}
            <div className="shrink-0">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2 italic">
                {currentCase.isCustom
                  ? "Input (Editable)"
                  : "Input (Read Only)"}
              </span>
              <div className="flex flex-col gap-2">
                {inputEntries.map(([key, val]) => (
                  <div key={key} className="flex items-center gap-3">
                    {/* Key label */}
                    <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest w-16 shrink-0 truncate">
                      {key}
                    </span>
                    {/* Value input */}
                    <input
                      type="text"
                      value={formatValue(val)}
                      onChange={
                        currentCase.isCustom
                          ? (e) => updateInputKey(key, e.target.value)
                          : undefined
                      }
                      readOnly={!currentCase.isCustom}
                      className={`flex-1 border border-slate-200 rounded-lg px-3 py-1.5 font-mono text-xs outline-none focus:ring-1 focus:ring-blue-400 transition-colors ${
                        currentCase.isCustom
                          ? "bg-slate-50 hover:border-slate-300"
                          : "bg-slate-100 cursor-not-allowed text-slate-600"
                      }`}
                    />
                  </div>
                ))}
              </div>
            </div>

            {/* Expected output */}
            <div className="shrink-0">
              <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest block mb-2">
                Expected Output
              </span>
              <div className="flex items-center gap-3">
                <span className="text-[10px] font-black text-slate-500 uppercase tracking-widest w-16 shrink-0">
                  result
                </span>
                <input
                  type="text"
                  value={formatValue(currentCase.output)}
                  onChange={
                    currentCase.isCustom
                      ? (e) => updateOutput(e.target.value)
                      : undefined
                  }
                  readOnly={!currentCase.isCustom}
                  className={`flex-1 border border-slate-200 rounded-lg px-3 py-1.5 font-mono text-xs outline-none focus:ring-1 focus:ring-green-400 transition-colors ${
                    currentCase.isCustom
                      ? "bg-slate-50 hover:border-slate-300"
                      : "bg-slate-100 cursor-not-allowed text-slate-600"
                  }`}
                />
              </div>
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400 text-xs italic gap-2">
            <FlaskConical size={32} className="opacity-20" />
            No test cases available.
          </div>
        )}
      </div>
    </div>
  );
};

export default TestCasesPanel;
