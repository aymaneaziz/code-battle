import React from "react";

export const PreferredStack = ({ preferences }) => {
  return (
    <div className="p-6 rounded-xl border border-slate-200 bg-white shadow-sm">
      <h3 className="text-xs font-bold uppercase text-slate-800 mb-4 tracking-widest ">
        Preferred Stack
      </h3>
      <div className="flex flex-wrap gap-2">
        {preferences?.language?.map((lang) => (
          <span
            key={lang._id}
            className="px-3 py-1 bg-slate-100 text-slate-600 rounded-full text-[11px] font-semibold border border-slate-200"
          >
            {lang.name}
          </span>
        ))}
      </div>
    </div>
  );
};
