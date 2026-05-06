import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

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

      <div className="grid grid-cols-4 gap-3">
        {badges.length > 0 ? (
          badges.map((item) => (
            <div
              key={item.badge?._id}
              title={item.badge?.name}
              className={cn(
                "aspect-square rounded-xl border flex items-center justify-center text-xl transition-all hover:shadow-md cursor-pointer",
                item.badge?.rarity === "Legendary"
                  ? "border-amber-200 bg-amber-50"
                  : item.badge?.rarity === "Epic"
                    ? "border-purple-200 bg-purple-50"
                    : "border-slate-100 bg-slate-50",
              )}
            >
              <span className="grayscale-[0.5] hover:grayscale-0 transition-all">
                {item.badge?.iconUrl || "🎖️"}
              </span>
            </div>
          ))
        ) : (
          <div className="col-span-4 py-6 text-center text-xs text-slate-400 border-2 border-dashed border-slate-100 rounded-xl">
            Go to the Arena to earn badges!
          </div>
        )}
      </div>
    </Card>
  );
}
