import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const SeasonSpotlights = ({ data, purchase }) => {
  return (
    <Card className="h-full relative bg-white/80 backdrop-blur border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl overflow-hidden p-6">
      <div className="absolute inset-0 bg-linear-to-br from-slate-100/40 to-transparent pointer-events-none" />

      {/* EMPTY STATE */}
      {(!data || data.length === 0) && (
        <div className="relative h-full flex items-center justify-center text-slate-500 font-semibold">
          No season spotlight available
        </div>
      )}

      <div className="relative grid grid-cols-2 md:grid-cols-4 gap-4 h-full items-stretch">
        {(data || []).map((item) => {
          const ref = item?.shopItemId?.refId;

          const coins = item?.shopItemId?.price?.coins ?? 0;
          const gems = item?.shopItemId?.price?.gems ?? 0;

          return (
            <div
              key={item._id}
              className="group relative flex flex-col items-center justify-center text-center gap-3 p-4 rounded-xl bg-white border border-slate-200 shadow-sm transition-all duration-300 hover:scale-[1.03] hover:shadow-lg"
            >
              {/* Icon + Label */}
              <div className="flex flex-row justify-center items-center gap-2">
                <div className="p-3 rounded-xl bg-slate-100 group-hover:scale-110 transition-transform duration-300">
                  {ref?.iconUrl}
                </div>

                <p className="text-xl font-extrabold text-slate-900">
                  {ref?.label}
                </p>
              </div>

              {/* Type */}
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                Type : {ref?.type}
              </p>
              <div className="flex flex-row justify-center items-center gap-2">
                {/* Coins price */}
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-bold text-yellow-600">💰 {coins}</span>
                </div>
                {/* Gems price */}
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-bold text-cyan-600">💎 {gems}</span>
                </div>
              </div>
              {/* Purchase limit */}
              <p className="text-[10px] text-slate-500">
                Limit: {item?.purchaseLimit}
              </p>

              {/* Buy button */}
              <Button
                className="mt-2 w-full bg-slate-900 text-white text-xs font-bold py-2 rounded-lg hover:bg-slate-800 cursor-pointer transition-all"
                onClick={() => purchase(item)}
              >
                Acheter
              </Button>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default SeasonSpotlights;
