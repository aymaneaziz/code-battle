import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

const Header = ({ system }) => {
  // format date propre
  const formatDate = (date) => {
    if (!date) return "N/A";

    return new Intl.DateTimeFormat("en-GB", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }).format(new Date(date));
  };

  // "x minutes ago"
  const timeAgo = (date) => {
    if (!date) return "";
    return dayjs(date).fromNow();
  };

  return (
    <div className="flex items-center justify-between w-full">
      {/* LEFT SIDE */}
      <div className="flex flex-col justify-center items-start gap-1">
        <p className="text-lg font-bold tracking-tight text-slate-900">
          GlobalBoard
        </p>

        <div className="flex items-center gap-2 text-sm text-slate-500">
          <span>
            Season{" "}
            <span className="text-blue-600 font-semibold">
              {system?.currentSeason}
            </span>
          </span>

          <span className="text-slate-300">•</span>

          <span>
            Week{" "}
            <span className="text-blue-600 font-semibold">
              {system?.currentWeek}
            </span>
          </span>
        </div>
      </div>

      {/* RIGHT SIDE — last update badge */}
      <div className="flex items-center gap-3 bg-slate-50 border border-slate-200 rounded-xl px-4 py-2">
        {/* Live indicator */}
        <div className="relative flex items-center justify-center">
          <span className="w-2 h-2 bg-emerald-500 rounded-full block"></span>
          <span className="absolute w-2 h-2 bg-emerald-500 rounded-full animate-ping opacity-40"></span>
        </div>

        {/* Text */}
        <div className="flex flex-col items-end leading-tight">
          <p className="text-sm font-semibold text-slate-800">
            {formatDate(system?.lastLeatherboardUpdate)}
          </p>

          <p className="text-[11px] text-slate-400">
            updated {timeAgo(system?.lastLeatherboardUpdate)}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Header;
