import React from "react";
import { Button } from "@/components/ui/button";
import { Play, Send, Loader2 } from "lucide-react";

const ExecutionPanel = ({ results, onExecute, loading }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 shadow-sm h-full flex flex-col overflow-hidden">
      <div className="px-4 py-2 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center shrink-0">
        <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
          Console Output
        </span>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => onExecute(false)}
            disabled={loading}
            className="h-8 text-xs font-bold"
          >
            {loading ? (
              <Loader2 className="w-3 h-3 animate-spin mr-2" />
            ) : (
              <Play className="w-3 h-3 mr-2" />
            )}
            Run Tests
          </Button>
          <Button
            size="sm"
            onClick={() => onExecute(true)}
            disabled={loading}
            className="h-8 text-xs font-bold bg-blue-600 hover:bg-blue-700 text-white"
          >
            <Send className="w-3 h-3 mr-2" /> Submit
          </Button>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto font-mono text-xs bg-slate-900 text-slate-300">
        {results ? (
          <div
            className={
              results.status?.id === 3 ? "text-green-400" : "text-red-400"
            }
          >
            <p className="font-bold mb-2 uppercase tracking-wide border-b border-slate-700 pb-1">
              Status: {results.status?.description || "Unknown"}
            </p>
            <pre className="whitespace-pre-wrap wrap-break-word font-mono text-[11px] leading-relaxed">
              {results.stdout ||
                results.compile_output ||
                results.stderr ||
                "No output."}
            </pre>
          </div>
        ) : (
          <div className="h-full flex items-center justify-center text-slate-500 italic">
            Ready to execute. Select "Run Tests" to verify your logic.
          </div>
        )}
      </div>
    </div>
  );
};

export default ExecutionPanel;
