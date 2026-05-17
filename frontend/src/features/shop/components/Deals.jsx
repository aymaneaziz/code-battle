import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Coins, Gem } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Deals = ({ data, purchase }) => {
  return (
    <Card className="h-full relative bg-white/80 backdrop-blur border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300 rounded-2xl overflow-hidden p-6">
      <div className="absolute inset-0 bg-linear-to-br from-slate-100/40 to-transparent pointer-events-none" />

      {/* EMPTY STATE */}
      {(!data || data.length === 0) && (
        <div className="relative h-full flex items-center justify-center text-slate-500 font-semibold">
          No deals available
        </div>
      )}

      <div className="relative grid grid-cols-2 md:grid-cols-4 gap-4 h-full items-stretch">
        {(data || []).map((item) => {
          const ref = item?.shopItemId?.refId;

          const coinDiscount = item?.discountPercentage?.coins ?? 0;
          const gemDiscount = item?.discountPercentage?.gems ?? 0;

          const originalCoins = item?.shopItemId?.price?.coins ?? 0;
          const originalGems = item?.shopItemId?.price?.gems ?? 0;

          const discountedCoins = Math.max(
            Math.floor(originalCoins * (1 - coinDiscount / 100)),
            0,
          );

          const discountedGems = Math.max(
            Math.floor(originalGems * (1 - gemDiscount / 100)),
            0,
          );

          return (
            <Card
              key={item._id}
              className="bg-white min-h-40 p-4 flex flex-col justify-between shadow-md"
            >
              <div className="flex items-start justify-between">
                <div className="flex flex-row items-center gap-4">
                  <Card className="w-10 h-10 border border-indigo-300 bg-indigo-50 flex items-center justify-center text-xl font-bold">
                    {ref?.iconUrl}
                  </Card>
                  <p>{ref?.label ?? ref?.name}</p>
                </div>

                <Card className="px-3 py-1 border text-indigo-600  bg-indigo-50 text-sm font-medium border-indigo-300">
                  {ref?.type}
                </Card>
              </div>

              {/* description */}
              <div className="flex flex-col">
                <p className="text-sm text-zinc-600 leading-relaxed">
                  {ref?.description}
                </p>

                {/* Purchase limit */}
                <p className="text-[10px] text-slate-500">
                  Limit: {item?.purchaseLimit}
                </p>
              </div>

              {/* prix */}
              <div className="flex justify-between items-center">
                <div className="flex gap-2">
                  {/* coins */}
                  <Badge className="flex items-center gap-1 px-1 py-1 bg-amber-50 text-amber-600 rounded-full border border-amber-600">
                    <Coins size={10} className="fill-amber-600" />
                    <span className="text-[10px] font-bold uppercase">
                      {discountedCoins}
                    </span>
                    {coinDiscount > 0 && (
                      <>
                        <span className="line-through text-slate-400 text-xs">
                          {originalCoins}
                        </span>

                        <span className="text-[10px] font-bold bg-red-100 text-red-500 px-2 py-0.5 rounded-full">
                          -{coinDiscount}%
                        </span>
                      </>
                    )}
                  </Badge>

                  {/* gems */}
                  <Badge className="flex items-center gap-1 px-1 py-1 bg-indigo-50 text-indigo-600 rounded-full border border-indigo-600">
                    <Gem size={10} className="fill-indigo-600" />
                    <span className="text-[10px] font-bold uppercase">
                      {discountedGems}
                    </span>
                    {gemDiscount > 0 && (
                      <>
                        <span className="line-through text-slate-400 text-xs">
                          {originalGems}
                        </span>

                        <span className="text-[10px] font-bold bg-red-100 text-red-500 px-2 py-0.5 rounded-full">
                          -{gemDiscount}%
                        </span>
                      </>
                    )}
                  </Badge>
                </div>
                <div>
                  {/* Buy button */}
                  <Button
                    className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white hover:cursor-pointer"
                    onClick={() => purchase(item)}
                  >
                    Acheter
                  </Button>
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </Card>
  );
};

export default Deals;
