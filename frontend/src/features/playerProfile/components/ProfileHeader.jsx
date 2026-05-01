import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Shield } from "lucide-react";

export function ProfileHeader({ identity, rankInfo }) {
  return (
    <Card className="bg-white border-slate-200 shadow-sm overflow-hidden">
      <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center">
        {/* Avatar avec un cercle simple et propre */}
        <div className="h-24 w-24 rounded-full border-2 border-slate-100 bg-slate-50 flex items-center justify-center text-4xl shadow-inner">
          {identity.avatar?.iconUrl || "👤"}
        </div>

        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center gap-2 mb-2">
            <h1 className="text-2xl font-bold text-slate-900">
              {identity.displayName || identity.username}
            </h1>
            <span className="text-slate-400 text-sm font-medium">
              @{identity.username}
            </span>
          </div>

          <p className="text-slate-500 text-sm max-w-lg mb-4">
            {identity.bio || "No bio yet."}
          </p>

          <div className="flex flex-wrap justify-center md:justify-start gap-4 text-xs font-semibold text-slate-400 uppercase tracking-wide">
            <div className="flex items-center gap-1">
              <MapPin size={14} /> {identity.location || "Morocco"}
            </div>
            <div className="flex items-center gap-1 text-blue-600">
              <Shield size={14} /> Level {rankInfo.level}
            </div>
          </div>
        </div>

        {/* ELO Card Minimaliste */}
        <div className="bg-slate-50 px-6 py-4 rounded-xl border border-slate-100 text-center">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">
            Global ELO
          </p>
          <p className="text-3xl font-black text-slate-900">{rankInfo.elo}</p>
        </div>
      </div>
    </Card>
  );
}
