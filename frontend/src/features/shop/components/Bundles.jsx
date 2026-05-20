import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Coins, Gem } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Bundles = ({ data, purchase }) => {
  return (
    <Card className="h-full relative bg-white border border-slate-200 shadow-sm rounded-2xl overflow-hidden p-5">
      {/* EMPTY STATE */}
      {(!data || data.length === 0) && (
        <div className="relative h-full flex items-center justify-center text-slate-500 font-semibold py-10">
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
            <Card
              key={item._id}
              className="bg-white min-h-40 p-4 flex flex-col justify-between shadow-sm border border-slate-200 rounded-2xl hover:shadow-md transition-shadow duration-200"
            >
              {/* Header */}
              <div className="flex items-start justify-between">
                <div className="flex flex-row items-center gap-3">
                  <div className="w-10 h-10 border border-violet-200 bg-violet-50 rounded-xl flex items-center justify-center text-xl">
                    {item?.iconUrl}
                  </div>
                  <p className="text-sm font-semibold text-slate-700">
                    {item?.name}
                  </p>
                </div>
                <span className="px-2.5 py-1 border border-slate-200 text-slate-500 bg-slate-50 text-[11px] font-bold uppercase tracking-widest rounded-lg">
                  {expiration === "Permanent" ? "Permanent" : expiration}
                </span>
              </div>

              {/* Description */}
              <div className="flex flex-col gap-0.5">
                <p className="text-sm text-slate-600 leading-relaxed">
                  {item?.description}
                </p>
                <p className="text-[10px] text-slate-400 font-medium">
                  Limit: {item?.purchaseLimit}
                </p>
              </div>

              {/* Bundle items */}
              <div className="flex flex-col gap-2">
                <p className="text-[10px] font-bold uppercase tracking-widest text-slate-600">
                  This pack contains
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {(item?.items || []).map((bundleItem) => {
                    const ref = bundleItem?.refId;
                    if (!ref) return null;
                    return (
                      <Badge
                        key={bundleItem._id}
                        className="flex items-center gap-1 px-2 py-1 bg-slate-100 text-slate-600 rounded-full border border-slate-200"
                      >
                        <span>{ref?.refId?.iconUrl}</span>
                        <span className="text-[10px] font-bold">
                          x{bundleItem?.quantity}
                        </span>
                        <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400">
                          {ref?.refType}
                        </span>
                      </Badge>
                    );
                  })}
                </div>
              </div>

              {/* Price */}
              <div className="flex justify-between items-center pt-2">
                <div className="flex gap-1.5">
                  {/* Coins — amber/gold */}
                  <Badge className="flex items-center gap-1 px-2 py-1 bg-amber-50 text-amber-600 rounded-full border border-amber-600">
                    <Coins
                      size={10}
                      className="fill-amber-600 text-amber-600"
                    />
                    <span className="text-[10px] font-bold">{coins}</span>
                  </Badge>

                  {/* Gems — violet/purple */}
                  <Badge className="flex items-center gap-1 px-2 py-1 bg-violet-50 text-indigo-600 rounded-full border border-indigo-600">
                    <Gem
                      size={10}
                      className="fill-indigo-600 text-indigo-600"
                    />
                    <span className="text-[10px] font-bold">{gems}</span>
                  </Badge>
                </div>

                {/* Buy button */}
                <Button
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl cursor-pointer"
                  onClick={() => purchase(item)}
                >
                  Buy
                </Button>
              </div>
            </Card>
          );
        })}
      </div>
    </Card>
  );
};

export default Bundles;
