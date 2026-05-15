import { Badge } from "@/components/ui/badge";
import { Coins, Gem, Zap } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";

const Body = ({ missions }) => {
  {
    /* EMPTY STATE */
  }
  if (!missions)
    return (
      <Card className="relative h-full flex items-center justify-center text-slate-500 font-semibold">
        No missions available
      </Card>
    );
  return (
    <Card
      className={`h-full relative bg-white/80 backdrop-blur shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden 
      grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 p-4`}
    >
      {/* Grid */}
      {missions?.map((item) => {
        const mission = item?.mission;
        const reward = Object.fromEntries(
          item?.rewardPrices.map((i) => [i.rewardType, i.amount])
        );

        return (
          <Card
            key={item._id}
            className="bg-white min-h-60 p-4 flex flex-col justify-between shadow-md"
          >
            {/* Top */}
            <div className="flex items-start justify-between">
              <div className="flex flex-row items-center gap-4">
                <Card className="w-10 h-10 border-2 border-black flex items-center justify-center text-xl font-bold">
                  {mission.iconUrl}
                </Card>
                <p>{mission.mission}</p>
              </div>

              <Card className="px-3 py-1 border-2 border-black text-sm font-medium bg-zinc-100">
                {mission.type}
              </Card>
            </div>

            {/* Content */}
            <div className="flex flex-col">
              <h2 className="text-xl font-bold">{mission.title}</h2>

              <p className="text-sm text-zinc-600 leading-relaxed">
                {mission.description}
              </p>

              {/* Progress */}
              <div className="mt-5">
                <div className="flex justify-between text-sm font-medium mb-1">
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
            <div className="flex justify-between items-center">
              <div className="flex gap-2">
                {/* XP  */}
                {reward?.Xp > 0 && (
                  <Badge className="flex items-center gap-1 px-1 py-1 bg-indigo-50 text-green-600 rounded-full border border-green-600">
                    <Zap size={10} className="fill-green-600" />
                    <span className="text-[10px] font-bold uppercase">
                      +{reward?.Xp} XP
                    </span>
                  </Badge>
                )}
                {/* Coins  */}
                {reward?.Coins > 0 && (
                  <Badge className="flex items-center gap-1 px-1 py-1 bg-amber-50 text-amber-600 rounded-full border border-amber-600">
                    <Coins size={10} className="fill-amber-600" />
                    <span className="text-[10px] font-bold uppercase">
                      +{reward?.Coins} Coins
                    </span>
                  </Badge>
                )}
                {/* Gems  */}
                {reward?.Gems > 0 && (
                  <Badge className="flex items-center gap-1 px-1 py-1 bg-indigo-50 text-indigo-600 rounded-full border border-indigo-600">
                    <Gem size={10} className="fill-indigo-600" />
                    <span className="text-[10px] font-bold uppercase">
                      +{reward?.Gems} Gems
                    </span>
                  </Badge>
                )}
              </div>
              <div>
                {item?.isClaimed ? (
                  <Card className="px-3 py-1 border-2 border-black text-sm font-medium bg-zinc-100">
                    Claimed
                  </Card>
                ) : (
                  item?.isCompleted && <Button>Claim</Button>
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
