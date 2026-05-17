import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Bundles = ({ data, purchase }) => {
  return (
    <Card className="h-full relative bg-white/80 backdrop-blur border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl overflow-hidden p-6">
      <div className="absolute inset-0 bg-linear-to-br from-slate-100/40 to-transparent pointer-events-none" />

      {/* EMPTY STATE */}
      {(!data || data.length === 0) && (
        <div className="relative h-full flex items-center justify-center text-slate-500 font-semibold">
          No bundles available
        </div>
      )}

      <div className="relative grid grid-cols-2 md:grid-cols-4 gap-4 h-full items-stretch">
        {(data || []).map((item) => {
          const coins = item?.price?.coins ?? 0;
          const gems = item?.price?.gems ?? 0;

          const end = item?.endTime;
          const expiration = !end
            ? "Permanent"
            : new Date(end).toLocaleDateString();

          return (
            <div
              key={item._id}
              className="group relative flex flex-col justify-between gap-4 p-4 rounded-xl bg-white border border-slate-200 shadow-sm transition-all duration-300 hover:scale-[1.03] hover:shadow-lg"
            >
              {/* EXPIRATION (top-right) */}
              <div className="absolute top-2 right-2 text-[10px] font-bold text-slate-500 bg-slate-100 px-2 py-1 rounded-full">
                {expiration === "Permanent" ? "Permanent" : expiration}
              </div>

              {/* Header */}
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-xl bg-slate-100 text-2xl group-hover:scale-110 transition-transform duration-300">
                  {item?.iconUrl}
                </div>

                <div>
                  <p className="text-lg font-extrabold text-slate-900">
                    {item?.name}
                  </p>

                  <p className="text-[11px] text-slate-500">
                    {item?.description}
                  </p>
                </div>
              </div>

              {/* Bundle items */}
              <div className="flex flex-wrap gap-2">
                {(item?.items || []).map((bundleItem) => {
                  const ref = bundleItem?.refId;

                  if (!ref) return null;

                  return (
                    <div
                      key={bundleItem._id}
                      className="flex flex-col items-center gap-1 px-2 py-1 rounded-lg bg-slate-100 text-xs font-semibold text-slate-700"
                    >
                      <div className="flex items-center">
                        <span>{ref?.refId?.iconUrl}</span>
                        <span>x{bundleItem?.quantity}</span>
                      </div>

                      {/* type */}
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                        {ref?.refType}
                      </span>
                    </div>
                  );
                })}
              </div>

              {/* Prices */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-sm font-bold text-amber-600">
                  <span>💰</span>
                  <span>{coins}</span>
                </div>

                <div className="flex items-center gap-1 text-sm font-bold text-cyan-600">
                  <span>💎</span>
                  <span>{gems}</span>
                </div>
              </div>

              {/* Footer */}
              <div className="flex flex-col gap-2">
                <p className="text-[10px] text-slate-500">
                  Limit: {item?.purchaseLimit}
                </p>

                <Button
                  className="w-full bg-slate-900 text-white text-xs font-bold py-2 rounded-lg hover:bg-slate-800 cursor-pointer transition-all"
                  onClick={() => purchase(item)}
                >
                  Acheter
                </Button>
              </div>
            </div>
          );
        })}
      </div>
    </Card>
  );
};

export default Bundles;
