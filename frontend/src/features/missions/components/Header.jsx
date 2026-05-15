import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const Header = ({ data, onClick }) => {
  const stats = data?.stats;
  return (
    <Card className="h-full relative bg-white/80 backdrop-blur shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden p-6">
      <div className="flex justify-between flex-wrap gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Mission Board</h1>
          <p className="text-sm text-zinc-500 mt-1">
            Complete missions to earn XP, coins and rewards.
          </p>
        </div>
        <div>
          {/* Stats */}
          <div className="flex flex-wrap gap-3">
            <Card className="border border-slate-200 shadow-sm px-4 py-2 bg-zinc-50 min-w-25 text-center gap-0">
              <p className="text-xs text-zinc-500">Daily Done</p>
              <p className="font-bold text-lg">
                {stats.completedDailyMissions}/{stats.dailyMissions}
              </p>
            </Card>
            <Card className="border border-slate-200 shadow-sm px-4 py-2 bg-zinc-50 min-w-25 text-center gap-0">
              <p className="text-xs text-zinc-500">Weekly Done</p>
              <p className="font-bold text-lg">
                {stats.completedWeeklyMissions}/{stats.weeklyMissions}
              </p>
            </Card>
            <Card className="border border-slate-200 shadow-sm px-4 py-2 bg-zinc-50 min-w-25 text-center gap-0">
              <p className="text-xs text-zinc-500">Seasonal Done</p>
              <p className="font-bold text-lg">
                {stats.completedSeasonalMissions}/{stats.seasonalMissions}
              </p>
            </Card>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex justify-left flex-wrap gap-2 overflow-x-auto">
        <Button
          className={`px-5 py-2 hover:cursor-pointer ${
            data.selectedCategory === "DAILY"
              ? "bg-blue-700 text-white"
              : "bg-white text-black border border-slate-200"
          }`}
          onClick={() => onClick("DAILY")}
        >
          Daily
        </Button>

        <Button
          className={`px-5 py-2 hover:cursor-pointer ${
            data.selectedCategory === "WEEKLY"
              ? "bg-blue-700 text-white"
              : "bg-white text-black border border-slate-200"
          }`}
          onClick={() => onClick("WEEKLY")}
        >
          Weekly
        </Button>

        <Button
          className={`px-5 py-2 hover:cursor-pointer ${
            data.selectedCategory === "SEASONAL"
              ? "bg-blue-700 text-white"
              : "bg-white text-black border border-slate-200"
          }`}
          onClick={() => onClick("SEASONAL")}
        >
          Seasonal
        </Button>
      </div>
    </Card>
  );
};

export default Header;
