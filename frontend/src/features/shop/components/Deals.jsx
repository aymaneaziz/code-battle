import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

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
            0
          );

          const discountedGems = Math.max(
            Math.floor(originalGems * (1 - gemDiscount / 100)),
            0
          );

          return (
            <Card
              key={item._id}
              className="group relative flex flex-col items-center justify-center text-center gap-3 p-4 bg-white border border-slate-200 shadow-sm transition-all duration-300 hover:scale-[1.03] hover:shadow-lg"
            >
              {/* Icon + Label */}
              <div className="flex flex-row justify-center items-center gap-2">
                <div className="p-3 bg-slate-100 group-hover:scale-110 transition-transform duration-300">
                  {ref?.iconUrl}
                </div>

                {/* infos */}
                <div className="text-left">
                  <p className="text-xl font-extrabold text-slate-900">
                    {ref?.label ?? ref?.name}
                  </p>

                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mt-1">
                    {ref?.type}
                  </p>
                </div>
              </div>

              {/* description */}
              <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                {ref?.description}
              </p>

              {/* prix */}
              <div className="flex flex-wrap justify-center items-center gap-4 mt-2">
                {/* coins */}
                <div className="flex items-center gap-2 text-sm bg-yellow-100 px-4 py-2 rounded-full">
                  <span className="font-bold text-yellow-600 text-sm">
                    💰 {discountedCoins}
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
                </div>

                {/* gems */}
                <div className="flex items-center gap-2 text-sm bg-cyan-100 px-4 py-2 rounded-full">
                  <span className="font-bold text-cyan-600 text-sm">
                    💎 {discountedGems}
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
            </Card>
          );
        })}
      </div>
    </Card>
  );
};

export default Deals;
