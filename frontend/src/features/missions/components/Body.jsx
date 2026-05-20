import { Badge } from "@/components/ui/badge";
import { Coins, Gem, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { useState } from "react";

const Body = ({ missions, onClaim, isLoading }) => {
  {
    /* EMPTY STATE */
  }

  if (isLoading)
    return (
      <Card className="relative h-full flex items-center justify-center text-slate-500 font-semibold py-20">
        Loading missions...
      </Card>
    );

  if (!missions)
    return (
      <Card className="relative h-full flex items-center justify-center text-slate-500 font-semibold py-20">
        No missions available
      </Card>
    );

  const [loading, setLoading] = useState(false);

  const handleClaim = async (missionInstanceId) => {
    setLoading(true);
    await onClaim({ missionInstanceId });
    setLoading(false);
  };

  return (
    <Card
      className={`h-full relative bg-white border border-slate-200 rounded-2xl shadow-sm
      grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 p-4`}
    >
      {/* Grid */}
      {missions?.map((item) => {
        const mission = item?.mission;
        const reward = Object.fromEntries(
          item?.rewardPrices.map((i) => [i.rewardType, i.amount]),
        );

        return (
          <Card
            key={item._id}
            className="bg-white min-h-60 p-4 flex flex-col justify-between shadow-sm border border-slate-200 rounded-2xl hover:shadow-md transition-shadow duration-200"
          >
            {/* Top */}
            <div className="flex items-start justify-between">
              <div className="flex flex-row items-center gap-3">
                <div className="w-10 h-10 border border-violet-200 bg-violet-50 rounded-xl flex items-center justify-center text-xl">
                  {mission.iconUrl}
                </div>
                <p className="text-sm font-semibold text-slate-700">
                  {mission.mission}
                </p>
              </div>
              <span className="px-2.5 py-1 border border-slate-200 text-slate-500 bg-slate-50 text-[11px] font-bold uppercase tracking-widest rounded-lg">
                {mission.type}
              </span>
            </div>

            {/* Content */}
            <div className="flex flex-col gap-1">
              <h2 className="text-base font-bold text-slate-900">
                {mission.mission}
              </h2>
              <p className="text-sm text-slate-500 leading-relaxed">
                {mission.description}
              </p>

              {/* Progress */}
              <div className="mt-4">
                <div className="flex justify-between text-xs font-semibold text-slate-500 mb-1.5">
                  <span>Progress</span>
                  <span>
                    {item.progress}/{item.target}
                  </span>
                </div>
                <Progress
                  value={(item.progress / item.target) * 100}
                  className="h-2 bg-slate-100"
                />
              </div>
            </div>

            {/* Bottom */}
            <div className="flex justify-between items-center pt-2">
              <div className="flex gap-1.5 flex-wrap">
                {/* XP — electric blue like navbar */}
                {reward?.Xp > 0 && (
                  <Badge className="flex items-center gap-1 px-2 py-1  text-blue-600 rounded-full border border-blue-600 bg-amber-50">
                    <Zap size={10} className="fill-blue-600 text-blue-600" />
                    <span className="text-[10px] font-bold uppercase">
                      +{reward?.Xp} XP
                    </span>
                  </Badge>
                )}
                {/* Coins — amber/gold like navbar */}
                {reward?.Coins > 0 && (
                  <Badge className="flex items-center gap-1 px-2 py-1 bg-amber-50 text-amber-600 rounded-full border border-amber-600">
                    <Coins
                      size={10}
                      className="fill-amber-600 text-amber-600"
                    />
                    <span className="text-[10px] font-bold uppercase">
                      +{reward?.Coins}
                    </span>
                  </Badge>
                )}
                {/* Gems — purple/violet like navbar */}
                {reward?.Gems > 0 && (
                  <Badge className="flex items-center gap-1 px-2 py-1 bg-indigo-50 text-indigo-600 rounded-full border border-indigo-600">
                    <Gem
                      size={10}
                      className="fill-indigo-600 text-indigo-600"
                    />
                    <span className="text-[10px] font-bold uppercase">
                      +{reward?.Gems}
                    </span>
                  </Badge>
                )}
              </div>

              <div>
                {item?.isClaimed ? (
                  <span className="px-3 py-1 border border-slate-200 text-slate-400 bg-slate-50 text-xs font-semibold rounded-lg">
                    Claimed
                  </span>
                ) : (
                  item?.isCompleted && (
                    <Button
                      className={
                        "px-5 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold rounded-xl cursor-pointer" +
                        (loading ? " opacity-50 cursor-not-allowed" : "")
                      }
                      onClick={() => handleClaim(item._id)}
                      disabled={loading}
                    >
                      Claim
                    </Button>
                  )
                )}
              </div>
            </div>
          </Card>
        );
      })}
    </Card>
  );
};

export default Body;
