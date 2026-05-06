import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Play, Send, X, FlaskConical } from "lucide-react";

const TestCasesPanel = ({
  testCases,
  setTestCases,
  onRun,
  onSubmit,
  loading,
}) => {
  const [activeTab, setActiveTab] = useState("0");

  const addCase = () => {
    // Intelligently copy the structure of the first test case's input if it exists
    const baseInput = testCases.length > 0 ? testCases[0].input : {};

    // Create an empty mock object retaining the keys
    const emptyInput =
      typeof baseInput === "object"
        ? Object.keys(baseInput).reduce(
            (acc, key) => ({ ...acc, [key]: "" }),
            {},
          )
        : "";

    const newIdx = testCases.length;
    const newCase = {
      testCaseId: `custom-${Date.now()}`,
      input: emptyInput,
      output: "",
      isCustom: true,
    };

    setTestCases([...testCases, newCase]);
    setActiveTab(String(newIdx));
  };

  const removeCase = (e, indexToRemove) => {
    e.stopPropagation(); // Prevents the click from triggering the tab selection
    const filtered = testCases.filter((_, idx) => idx !== indexToRemove);
    setTestCases(filtered);

    // Smart active tab resolution
    const currentActive = parseInt(activeTab);
    if (currentActive === indexToRemove) {
      // If we deleted the active tab, move left (or stay at 0)
      setActiveTab(String(Math.max(0, indexToRemove - 1)));
    } else if (currentActive > indexToRemove) {
      // If we deleted a tab before the active one, shift the active index down
      setActiveTab(String(currentActive - 1));
    }
  };

  const updateCase = (field, value) => {
    const idx = parseInt(activeTab);
    const updated = [...testCases];

    try {
      // Attempt to parse as JSON first (handles arrays and objects nicely)
      updated[idx][field] = JSON.parse(value);
    } catch {
      // Fallback to raw string if they are typing mid-word or want string output
      updated[idx][field] = value;
    }

    setTestCases(updated);
  };

  const currentCase = testCases[parseInt(activeTab)];

  // Helper to format values for the textarea reliably
  const formatForTextarea = (val) => {
    if (val === undefined || val === null) return "";
    return typeof val === "object" ? JSON.stringify(val, null, 2) : String(val);
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm h-full flex flex-col overflow-hidden">
      {/* Top Action Bar */}
      <div className="px-4 py-3 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
        <div className="flex gap-2">
          <Button
            onClick={onSubmit}
            disabled={loading}
            className="bg-green-600 hover:bg-green-700 h-8 font-bold text-xs cursor-pointer"
          >
            <Send size={14} className="mr-2" />
            {loading ? "Sending..." : "Submit"}
          </Button>
          <Button
            onClick={onRun}
            disabled={loading}
            variant="outline"
            className="text-blue-600 h-8 font-bold text-xs cursor-pointer"
          >
            <Play size={14} className="mr-2 fill-blue-600" /> Run
          </Button>
        </div>
      </div>

      <div className="p-4 flex-1 flex flex-col min-h-0">
        {/* Custom Tabs Header */}
        <div className="flex items-center justify-between mb-3 shrink-0">
          <div className="flex items-center gap-1 overflow-x-auto no-scrollbar bg-slate-100 p-1 rounded-lg">
            {testCases.map((tc, idx) => {
              const isActive = activeTab === String(idx);
              return (
                <div
                  key={idx}
                  onClick={() => setActiveTab(String(idx))}
                  className={`flex items-center text-[10px] font-bold px-3 py-1.5 rounded-md relative group cursor-pointer transition-all whitespace-nowrap ${
                    isActive
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-500 hover:text-slate-700 hover:bg-slate-200/50"
                  }`}
                >
                  Case {idx + 1}
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
            className="text-blue-600 font-bold text-[11px] flex items-center cursor-pointer  ml-4 shrink-0"
          >
            <Plus size={14} className="mr-1" /> Add Custom
          </button>
        </div>

        {/* Content Area */}
        {currentCase ? (
          <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-4 min-h-0">
            {/* Input Area */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest italic">
                {currentCase.isCustom
                  ? "Input (Editable)"
                  : "Input (Read Only)"}
              </label>
              <textarea
                className={`flex-1 border border-slate-200 rounded-xl p-3 font-mono text-xs outline-none focus:ring-1 focus:ring-blue-500 resize-none ${
                  !currentCase.isCustom
                    ? "bg-slate-100 cursor-not-allowed"
                    : "bg-slate-50"
                }`}
                value={formatForTextarea(currentCase.input)}
                onChange={(e) => updateCase("input", e.target.value)}
                readOnly={!currentCase.isCustom}
              />
            </div>
            {/* Output Area */}
            <div className="flex flex-col gap-2">
              <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Expected Output
              </label>
              <textarea
                className={`flex-1 border border-slate-200 rounded-xl p-3 font-mono text-xs outline-none focus:ring-1 focus:ring-blue-500 resize-none ${
                  !currentCase.isCustom
                    ? "bg-slate-100 cursor-not-allowed"
                    : "bg-slate-50"
                }`}
                value={formatForTextarea(currentCase.output)}
                onChange={(e) => updateCase("output", e.target.value)}
                readOnly={!currentCase.isCustom}
              />
            </div>
          </div>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-slate-400 text-xs italic gap-2">
            <FlaskConical size={32} className="opacity-20" />
            No test cases selected.
          </div>
        )}
      </div>
    </div>
  );
};

export default TestCasesPanel;
