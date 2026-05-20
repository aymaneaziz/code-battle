import React from "react";
import { createPortal } from "react-dom";
import { Zap } from "lucide-react";

const Purchasing = () => {
  return createPortal(
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-[9999]">
      <div className="bg-white border border-slate-200 p-8 rounded-2xl shadow-2xl flex flex-col items-center gap-5 min-w-[240px]">
        {/* spinner */}
        <div className="w-12 h-12 border-4 border-slate-100 border-t-blue-600 rounded-full animate-spin" />

        {/* message */}
        <div className="flex flex-col items-center gap-1.5 text-center">
          <p className="text-sm font-bold text-slate-800 tracking-wide">
            Processing purchase...
          </p>
          <p className="text-xs text-slate-400">Please wait a moment</p>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default Purchasing;
