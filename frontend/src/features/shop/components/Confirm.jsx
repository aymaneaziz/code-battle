import React from "react";
import { createPortal } from "react-dom";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Coins, Gem, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

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
    0,
  );

  const discountedGems = Math.max(
    Math.floor(originalGems * (1 - gemDiscount / 100)),
    0,
  );

  return createPortal(
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-9999 p-4">
      <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl w-full max-w-md p-6 flex flex-col gap-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-900 uppercase tracking-widest">
            Confirm Purchase
          </h2>
          <button
            onClick={handleClose}
            className="w-8 h-8 rounded-lg bg-slate-100 hover:bg-slate-200 flex items-center justify-center text-slate-500 transition-colors cursor-pointer"
          >
            <X size={16} />
          </button>
        </div>

        {/* Item preview */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 border border-violet-200 bg-violet-50 rounded-2xl flex items-center justify-center text-3xl">
              {ref?.iconUrl}
            </div>
            <div>
              <p className="text-lg font-bold text-slate-900">
                {ref?.label ?? ref?.name}
              </p>
              <span className="px-2.5 py-1 border border-slate-200 text-slate-500 bg-slate-50 text-[11px] font-bold uppercase tracking-widest rounded-lg">
                {ref?.type}
              </span>
            </div>
          </div>
        </div>

        {/* Description */}
        <p className="text-sm text-slate-600 leading-relaxed">
          {ref?.description}
        </p>

        {/* Bundle items */}
        {ref?.type === "bundle" && (
          <div className="flex flex-col gap-2">
            <p className="text-[10px] font-bold uppercase tracking-widest text-slate-600">
              This pack contains
            </p>
            <div className="flex flex-wrap gap-1.5">
              {(ref?.items || []).map((bundleItem) => {
                const ref = bundleItem?.refId;
                if (!ref) return null;
                return (
                  <Badge
                    key={bundleItem._id}
                    className="flex items-center gap-1.5 px-2 py-1 bg-slate-100 text-slate-600 rounded-full border border-slate-200"
                  >
                    <span className="text-base">{ref?.refId?.iconUrl}</span>
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
        )}

        {/* Divider */}
        <div className="h-px bg-slate-100" />

        {/* Price + Actions */}
        <div className="flex items-center justify-between">
          {/* Prices */}
          <div className="flex gap-2 flex-wrap">
            {/* Coins — amber/gold */}
            <Badge className="flex items-center gap-1.5 px-3 py-2 bg-amber-50 text-amber-600 rounded-full border border-amber-600">
              <Coins size={14} className="fill-amber-600 text-amber-600" />
              <span className="text-sm font-bold">{discountedCoins}</span>
              {coinDiscount > 0 && (
                <>
                  <span className="line-through text-amber-400 text-xs">
                    {originalCoins}
                  </span>
                  <span className="text-[10px] font-bold bg-red-100 text-red-500 px-1.5 py-0.5 rounded-full">
                    -{coinDiscount}%
                  </span>
                </>
              )}
            </Badge>

            {/* Gems — violet/purple */}
            <Badge className="flex items-center gap-1.5 px-3 py-2 bg-indifo-50 text-indigo-600 rounded-full border border-indigo-600">
              <Gem size={14} className="fill-indigo-600 text-indigo-600" />
              <span className="text-sm font-bold">{discountedGems}</span>
              {gemDiscount > 0 && (
                <>
                  <span className="line-through text-indigo-300 text-xs">
                    {originalGems}
                  </span>
                  <span className="text-[10px] font-bold bg-red-100 text-red-500 px-1.5 py-0.5 rounded-full">
                    -{gemDiscount}%
                  </span>
                </>
              )}
            </Badge>
          </div>

          {/* Buttons */}
          <div className="flex items-center gap-2">
            {/* acheter */}
            <Button
              className="px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl cursor-pointer"
              onClick={() => purchase(selectedItem)}
            >
              Buy
            </Button>

            {/* fermer */}
            <Button
              onClick={handleClose}
              variant="outline"
              className="px-5 py-2 font-semibold rounded-xl border-slate-200 text-slate-600 hover:bg-slate-50 cursor-pointer"
            >
              Cancel
            </Button>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  );
};

export default Confirm;
