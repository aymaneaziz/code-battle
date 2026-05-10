import React from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";

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
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-9999 p-4">
      {/* modal */}
      <div className="bg-white p-8 md:p-10 rounded-2xl shadow-2xl w-full max-w-2xl relative animate-in fade-in zoom-in-95 duration-200">
        {/* titre */}
        <h2 className="text-sm text-center font-bold text-slate-500 uppercase tracking-widest mb-6">
          Confirm Purchase
        </h2>

        {/* card */}
        <div className="flex flex-col items-center justify-center text-center gap-5 p-6 rounded-2xl bg-slate-50 border border-slate-200">
          {/* icon + name */}
          <div className="flex items-center gap-4">
            {/* icon */}
            <div className="flex items-center justify-center w-20 h-20 rounded-2xl bg-white shadow-sm text-4xl border border-slate-100">
              {ref?.iconUrl}
            </div>

            {/* infos */}
            <div className="text-left">
              <p className="text-2xl font-extrabold text-slate-900">
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

          {/* bundle items */}
          {ref?.type === "bundle" && (
            <div className="w-full flex flex-col items-center gap-3">
              <p className="text-xs font-bold uppercase tracking-widest text-slate-500">
                This pack contains
              </p>

              <div className="flex flex-wrap justify-center gap-2">
                {(ref?.items || []).map((bundleItem) => {
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
            </div>
          )}

          {/* prix */}
          <div className="flex justify-center items-center gap-6 mt-2">
            {/* coins */}
            <div className="flex items-center gap-2 text-sm bg-yellow-100 px-4 py-2 rounded-full">
              <span className="font-bold text-yellow-600 text-lg">
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
              <span className="font-bold text-cyan-600 text-lg">
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

          {/* boutons */}
          <div className="flex justify-center items-center gap-3 mt-4">
            {/* acheter */}
            <Button
              className="bg-slate-900 text-white px-6 py-2 rounded-full text-xs font-bold hover:bg-slate-800 transition-all cursor-pointer"
              onClick={() => purchase(selectedItem)}
            >
              Acheter
            </Button>

            {/* fermer */}
            <Button
              onClick={handleClose}
              className="bg-red-500 text-white px-6 py-2 rounded-full text-xs font-bold hover:bg-red-600 transition-all cursor-pointer"
            >
              Fermer
            </Button>
          </div>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default Confirm;
