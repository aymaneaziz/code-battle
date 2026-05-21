import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Gem, Coins, Zap, Trophy } from "lucide-react";

const RewardModal = ({ isOpen, onClose, rewards, isNewlyClaimed = true }) => {
  // Filter out any reward that has a value of 0 or doesn't exist
  const showGems = rewards?.gems > 0;
  const showCoins = rewards?.coins > 0;
  const showXp = rewards?.xp > 0;

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent className="max-w-sm rounded-3xl p-8 border border-slate-200 bg-white text-slate-900 flex flex-col items-center text-center shadow-2xl">
        {/* Glowing Platform Icon (Light Mode) */}
        <div className="w-20 h-20 bg-yellow-50 text-yellow-500 rounded-full flex items-center justify-center mb-2 shadow-inner animate-bounce border border-yellow-100">
          <Trophy className="w-10 h-10" />
        </div>

        <DialogHeader className="flex flex-col items-center gap-1">
          <DialogTitle className="text-2xl font-black text-slate-800 tracking-tight">
            {isNewlyClaimed ? "Rewards Claimed!" : "Challenge Solved!"}
          </DialogTitle>
          <DialogDescription className="text-slate-500 text-sm max-w-65">
            {isNewlyClaimed
              ? "Your solution passed all test cases. Rewards added to your account!"
              : "All test cases passed perfectly."}
          </DialogDescription>
        </DialogHeader>

        {/* Dynamic Rewards Grid */}
        <div className="flex flex-wrap justify-center gap-3 w-full my-6">
          {/* Gems Box */}
          {showGems && (
            <div className="bg-indigo-50/60 border border-indigo-100 rounded-2xl px-4 py-3 flex items-center gap-2.5 min-w-22.5 justify-center shadow-sm">
              <Gem className="w-5 h-5 text-indigo-500 fill-indigo-500/10" />
              <span className="text-base font-black text-indigo-600">
                +{rewards.gems}
              </span>
            </div>
          )}

          {/* Coins Box */}
          {showCoins && (
            <div className="bg-amber-50/60 border border-amber-100 rounded-2xl px-4 py-3 flex items-center gap-2.5 min-w-22.5 justify-center shadow-sm">
              <Coins className="w-5 h-5 text-amber-500 fill-amber-500/10" />
              <span className="text-base font-black text-amber-600">
                {rewards.coins}
              </span>
            </div>
          )}

          {/* XP Box */}
          {showXp && (
            <div className="bg-blue-50/60 border border-blue-100 rounded-2xl px-4 py-3 flex items-center gap-2.5 min-w-25 justify-center shadow-sm">
              <Zap className="w-5 h-5 text-blue-500 fill-blue-500/10" />
              <span className="text-base font-black text-blue-600">
                {rewards.xp} XP
              </span>
            </div>
          )}
        </div>

        {/* Action Button */}
        <Button
          onClick={onClose}
          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold h-12 rounded-xl text-sm transition duration-200 cursor-pointer shadow-lg shadow-blue-600/15 border-none"
        >
          {isNewlyClaimed ? "Challenge Complete!" : "Close"}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default RewardModal;
