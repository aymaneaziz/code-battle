import React from "react";
import { createPortal } from "react-dom";

const Purchasing = () => {
  return createPortal(
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-9999">
      <div className="bg-white p-8 rounded-2xl shadow-2xl flex flex-col items-center gap-4">
        {/* spinner */}
        <div className="w-10 h-10 border-4 border-slate-300 border-t-slate-900 rounded-full animate-spin"></div>

        {/* message */}
        <p className="text-sm font-bold text-slate-600">
          Processing purchase...
        </p>
      </div>
    </div>,
    document.body
  );
};

export default Purchasing;
