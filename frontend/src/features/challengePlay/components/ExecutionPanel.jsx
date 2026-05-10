import React from "react";
import { Button } from "@/components/ui/button";
import {
  Play,
  Send,
  CheckCircle2,
  XCircle,
  Clock,
  MemoryStick,
} from "lucide-react";

const ResultCard = ({ result, index }) => {
  // ghir bach rverfi les champs dyal output, 7it kaymkn ykoun f compile_output wla stderr ila ma3mrch stdout
  const output =
    result.stdout ?? result.compile_output ?? result.stderr ?? "No output";

  return (
    <div
      className={`rounded-xl border p-3 shrink-0 ${
        result.isPassed
          ? "border-green-100 bg-green-50/40"
          : "border-red-100 bg-red-50/30"
      }`}
    >
      {/* Header */}
      <div
        className={`flex items-center gap-2 text-xs font-bold uppercase tracking-wide pb-2 mb-3 border-b ${
          result.isPassed
            ? "text-green-600 border-green-100"
            : "text-red-500 border-red-100"
        }`}
      >
        {result.isPassed ? <CheckCircle2 size={13} /> : <XCircle size={13} />}
        <span>
          {result.isCustom
            ? `Custom Case ${index + 1}`
            : `Test Case ${index + 1}`}
          {" — "}
          {result.status}
        </span>
        {result.isHidden && (
          <span className="ml-auto text-[10px] font-normal normal-case text-slate-400">
            Hidden
          </span>
        )}
      </div>

      {/* Output rows */}
      <div className="flex flex-col gap-2 font-mono text-[11px]">
        {/* Your output */}
        <div className="flex items-start gap-3">
          <span className="text-[10px] font-black text-slate-800 uppercase tracking-widest w-16 shrink-0 pt-0.5 ">
            Output
          </span>
          <div className="flex-1 bg-white border border-slate-200 rounded-lg px-3 py-1.5 text-slate-800 whitespace-pre-wrap break-all">
            {output}
          </div>
        </div>

        {/* Expected */}
        {!result.isPassed && result.expectedOutput && (
          <div className="flex items-start gap-3">
            <span className="text-[10px] font-black text-slate-800 uppercase tracking-widest w-16 shrink-0 pt-0.5">
              Expected
            </span>
            <div className="flex-1 bg-green-50 border border-green-200 rounded-lg px-3 py-1.5 text-green-800 whitespace-pre-wrap break-all">
              {result.expectedOutput}
            </div>
          </div>
        )}

        {/* Meta */}
        <div className="flex gap-4 text-[10px] text-slate-800 pt-1 pl-19">
          <span className="flex items-center gap-1.5 ">
            <Clock size={10} />
            {result.time ?? "—"}s
          </span>
          <span className="flex items-center gap-1.5 ">
            <MemoryStick size={10} /> {result.memory ?? "—"} KB
          </span>
        </div>
      </div>
    </div>
  );
};

// ─── ExecutionPanel ───────────────────────────────────────────────────────────

const ExecutionPanel = ({ results, onRun, onSubmit, loading }) => {
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

      {/* ── Results —────────────────────────────────── */}
      <div className="p-4 flex flex-col gap-3">
        {results ? (
          Array.isArray(results) ? (
            results.map((res, idx) => (
              <ResultCard
                key={res.testCaseId ?? idx}
                result={res}
                index={idx}
              />
            ))
          ) : (
            <div className="font-mono text-[11px] text-red-600 shrink-0">
              <p className="font-bold mb-2">Unexpected response</p>
              <pre className="whitespace-pre-wrap break-all bg-red-50 border border-red-100 rounded-lg p-3 text-red-700">
                {JSON.stringify(results, null, 2)}
              </pre>
            </div>
          )
        ) : (
          <div className="flex-1 flex items-center justify-center text-slate-400 italic text-xs">
            Press
            <span className="mx-1 font-bold not-italic text-blue-600">
              Run
            </span>{" "}
            to test your logic.
          </div>
        )}
      </div>
    </div>
  );
};

export default ExecutionPanel;
