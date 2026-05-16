import React from "react";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

import { Card } from "@/components/ui/card";

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
        <p className="text-lg font-semibold tracking-wide text-zinc-900">
          GlobalBoard
        </p>

        <p className="text-sm text-zinc-500 flex items-center gap-2">
          <span>
            Season{" "}
            <span className="text-blue-600 font-medium">
              {system?.currentSeason}
            </span>
          </span>

          <span className="text-zinc-400">•</span>

          <span>
            Week{" "}
            <span className="text-blue-600 font-medium">
              {system?.currentWeek}
            </span>
          </span>
        </p>
      </div>

      <div className="flex flex-col items-end">
        {/* Card */}
        <Card className="flex-row items-center bg-white/70 backdrop-blur-md px-4 py-2 shadow-sm hover:shadow-md transition">
          {/* Live indicator */}
          <div className="relative flex items-center justify-center">
            <span className="w-2.5 h-2.5 bg-green-500 rounded-full"></span>
            <span className="absolute w-2.5 h-2.5 bg-green-500 rounded-full animate-ping opacity-40"></span>
          </div>

          {/* Text */}
          <div className="flex flex-col items-end leading-tight">
            <p className="text-sm font-semibold text-zinc-800">
              {formatDate(system?.lastLeatherboardUpdate)}
            </p>

            <p className="text-[11px] text-zinc-500">
              updated {timeAgo(system?.lastLeatherboardUpdate)}
            </p>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Header;
