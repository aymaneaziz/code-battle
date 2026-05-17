import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const RARITY_BADGE_STYLES = {
  Legendary: "bg-amber-100 text-amber-800 border-amber-200",
  Epic: "bg-purple-100 text-purple-800 border-purple-200",
  Rare: "bg-blue-100 text-blue-800 border-blue-200",
  Common: "bg-slate-100 text-slate-700 border-slate-200",
};

export function BadgesSection({ badges = [] }) {
  return (
    <Card className="bg-white border-slate-200 shadow-sm p-6">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-xs font-bold uppercase tracking-widest text-slate-800">
          Badges
        </h3>
        <span className="text-[10px] font-mono text-slate-600">
          {badges.length} / 10
        </span>
      </div>

      <TooltipProvider delayDuration={100}>
        <div className="grid grid-cols-4 gap-3">
          {badges.length > 0 ? (
            badges.map((item) => {
              const badgeInfo = item.badge;
              const rarity = badgeInfo?.rarity || "Common";

              return (
                <Tooltip key={badgeInfo?._id}>
                  <TooltipTrigger asChild>
                    <div
                      className={cn(
                        "aspect-square rounded-xl border flex items-center justify-center text-2xl transition-all duration-200 hover:shadow-md hover:scale-105 cursor-pointer",
                        rarity === "Legendary"
                          ? "border-amber-200 bg-amber-50/60 shadow-sm"
                          : rarity === "Epic"
                            ? "border-purple-200 bg-purple-50/60 shadow-sm"
                            : rarity === "Rare"
                              ? "border-blue-200 bg-blue-50/60 shadow-sm"
                              : "border-slate-100 bg-slate-50/60",
                      )}
                    >
                      <span>{badgeInfo?.iconUrl || "🎖️"}</span>
                    </div>
                  </TooltipTrigger>

                  {/* FIXED RICH TOOLTIP BOX */}
                  <TooltipContent
                    side="top"
                    sideOffset={8}
                    className="p-4 w-72 bg-white text-slate-900 border border-slate-150 shadow-xl rounded-2xl animate-in fade-in-50 zoom-in-95 data-[side=top]:slide-in-from-bottom-2"
                  >
                    <div className="flex items-start justify-between gap-4">
                      {/* Left: Badge Name & Rarity underneath/beside */}
                      <div className="space-y-1.5 flex-1">
                        <p className="font-extrabold text-sm text-slate-900 tracking-tight leading-none">
                          {badgeInfo?.name || "Unknown Badge"}
                        </p>
                        <Badge
                          variant="outline"
                          className={cn(
                            "text-[10px] font-bold px-1.5 py-0.5 rounded-md shadow-none",
                            RARITY_BADGE_STYLES[rarity],
                          )}
                        >
                          {rarity}
                        </Badge>
                      </div>

                      {/* Right: Description Text */}
                      {badgeInfo?.description && (
                        <p className="text-xs font-medium text-slate-500 text-right max-w-35 leading-relaxed pt-0.5">
                          {badgeInfo.description}
                        </p>
                      )}
                    </div>
                  </TooltipContent>
                </Tooltip>
              );
            })
          ) : (
            <div className="col-span-4 py-6 text-center text-xs text-slate-400 border-2 border-dashed border-slate-100 rounded-xl">
              Go to the Arena to earn badges!
            </div>
          )}
        </div>
      </TooltipProvider>
    </Card>
  );
}
