import React from "react";
import { createPortal } from "react-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Coins, Gem } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const Confirm = ({ selectedItem, handleClose, purchase, mode }) => {
  // si aucun item sélectionné
  if (!selectedItem) return null;

  console.log(selectedItem);

  // récupération des données
  // si shop item => refId
  // sinon item direct
  const ref = selectedItem?.shopItemId?.refId ?? selectedItem;

  // réduction
  const coinDiscount = selectedItem?.discountPercentage?.coins ?? 0;
  const gemDiscount = selectedItem?.discountPercentage?.gems ?? 0;

  // prix original
  const originalCoins =
    selectedItem?.shopItemId?.price?.coins ?? selectedItem?.price?.coins ?? 0;

  const originalGems =
    selectedItem?.shopItemId?.price?.gems ?? selectedItem?.price?.gems ?? 0;

  // prix final
  const discountedCoins = Math.max(
    Math.floor(originalCoins * (1 - coinDiscount / 100)),
    0
  );

  const discountedGems = Math.max(
    Math.floor(originalGems * (1 - gemDiscount / 100)),
    0
  );

  return createPortal(
    // overlay
    <Card className="fixed w-full inset-0 bg-black/50 flex items-center justify-center z-9999 p-4">
      {/* modal */}
      <Card className="bg-white min-h-85 w-140 p-6 flex flex-col justify-between shadow-md rounded-2xl">
        {/* titre */}
        <h2 className="text-lg text-center font-bold text-slate-500 uppercase tracking-widest mb-6">
          Confirm Purchase
        </h2>

        <div className="flex items-start justify-between">
          <div className="flex flex-row items-center gap-4">
            <Card className="w-16 h-16 border border-indigo-300 bg-indigo-50 flex items-center justify-center text-3xl font-bold">
              {ref?.iconUrl}
            </Card>

            <p className="text-xl font-semibold">{ref?.label ?? ref?.name}</p>
          </div>

          <Card className="px-4 py-2 border text-indigo-600  bg-indigo-50 text-sm font-medium border-indigo-300">
            {ref?.type}
          </Card>
        </div>

        {/* description */}
        <div className="flex flex-col gap-4 mt-5">
          <p className="text-base text-zinc-600 leading-relaxed">
            {ref?.description}
          </p>

          {/* bundle items */}
          {ref?.type === "bundle" && (
            <div className="flex flex-col flex-wrap gap-2">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                This pack contains
              </p>

              <div className="flex flex-wrap gap-2">
                {(ref?.items || []).map((bundleItem) => {
                  const ref = bundleItem?.refId;

                  if (!ref) return null;

                  return (
                    <Badge
                      key={bundleItem._id}
                      className="flex items-center gap-2 px-2 py-1 bg-slate-100 text-slate-700 rounded-full text-xs"
                    >
                      <div className="flex items-center gap-1">
                        <span className="text-base">{ref?.refId?.iconUrl}</span>

                        <span>x{bundleItem?.quantity}</span>
                      </div>

                      {/* type */}
                      <span className="text-[10px] font-bold uppercase tracking-widest text-slate-500">
                        {ref?.refType}
                      </span>
                    </Badge>
                  );
                })}
              </div>
            </div>
          )}

          {/* prix */}
          <div className="flex justify-between items-center mt-4">
            <div className="flex gap-2">
              {/* coins */}
              <Badge className="flex items-center gap-2 px-3 py-2 bg-amber-50 text-amber-600 rounded-full border border-amber-600">
                <Coins size={15} className="fill-amber-600" />

                <span className="text-xs font-bold uppercase">
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
              <Badge className="flex items-center gap-2 px-3 py-2 bg-indigo-50 text-indigo-600 rounded-full border border-indigo-600">
                <Gem size={15} className="fill-indigo-600" />

                <span className="text-xs font-bold uppercase">
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
              {/* boutons */}
              <div className="flex justify-center items-center gap-3 mt-4">
                {/* acheter */}
                <Button
                  className="px-5 py-4 text-base bg-blue-600 hover:bg-blue-700 text-white hover:cursor-pointer"
                  onClick={() => purchase(selectedItem)}
                >
                  Buy
                </Button>

                {/* fermer */}
                <Button
                  onClick={handleClose}
                  className="px-5 py-4 text-base bg-red-600 hover:bg-red-700 text-white hover:cursor-pointer"
                >
                  Close
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </Card>,
    document.body
  );
};

export default Confirm;
