import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Shield, Calendar } from "lucide-react"; // Added Calendar

export function ProfileHeader({ identity, rankInfo }) {
  // Hna bach nriglo l format d createdAt
  const joinDate = identity.createdAt
    ? new Date(identity.createdAt).toLocaleDateString("en-US", {
        month: "long",
        year: "numeric",
      })
    : "Recently joined";

  return (
    <Card className="bg-white border-slate-200 shadow-sm overflow-hidden">
      <div className="p-6 md:p-8 flex flex-col md:flex-row gap-6 items-center">
        {/* Avatar */}
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
            {/* JOINED DATE  */}
            <div className="group relative flex items-center gap-1 cursor-pointer hover:text-slate-600 transition-colors">
              <Calendar size={14} />
              <span>Joined</span>
              <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 px-2 py-1 bg-slate-800 text-white text-[10px] rounded opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap z-10">
                {joinDate}
              </div>
            </div>

            <div className="flex items-center gap-1 text-blue-600">
              <Shield size={14} /> Level {rankInfo.level}
            </div>
          </div>
        </div>

        {/* ELO Card */}
        <div className="bg-slate-50 px-6 py-4 rounded-xl border border-slate-100 text-center">
          <p className="text-[10px] font-bold text-slate-800 uppercase tracking-widest mb-1">
            Global ELO
          </p>
          <p className="text-3xl font-black text-slate-900">{rankInfo.elo}</p>
        </div>
      </div>
    </Card>
  );
}
