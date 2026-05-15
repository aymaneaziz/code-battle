import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

const BattlePreferencesSection = ({
  preferences = [],
  formData,
  onSelect,
  onInputChange,
}) => {
  return (
    <div className="space-y-8 pt-6 border-t border-gray-100">
      <div className="flex items-center gap-3">
        <div className="h-6 w-1 bg-red-500"></div>
        {/* titre dark  */}
        <h2 className="text-xl font-bold uppercase tracking-tight text-gray-900">
          Battle Parameters
        </h2>
      </div>

      {/* Difficulty Cards  */}
      <div className="space-y-4">
        <Label className="text-xs uppercase tracking-[0.2em] text-gray-900 ml-1">
          Default Difficulty
        </Label>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {preferences.map((pref) => (
            <div
              key={pref._id}
              onClick={() => onSelect("preferenceId", pref._id)}
              className={cn(
                "cursor-pointer p-4 rounded-xl border-2 transition-all flex flex-col items-center text-center gap-2",
                // style dyal l carte sghira li kankhtaro
                formData.preferenceId === pref._id
                  ? "border-red-500 bg-red-50 shadow-sm"
                  : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50",
              )}
            >
              <span className="text-3xl">{pref.iconUrl}</span>
              <h4
                className={cn(
                  "font-bold uppercase tracking-tighter",
                  formData.preferenceId === pref._id
                    ? "text-red-600"
                    : "text-gray-800",
                )}
              >
                {pref.label}
              </h4>
              <p className="text-[11px] text-gray-500 leading-tight">
                {pref.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Warrior Bio */}
      <div className="space-y-2">
        <Label className="text-xs uppercase tracking-[0.2em] text-gray-900 ml-1">
          Warrior Bio
        </Label>
        {/* text area * */}
        <Textarea
          name="bio"
          placeholder="Tell the arena who you are ... (max 40 chars)"
          className="bg-white border-gray-200 focus:border-red-500 focus:ring-red-500/10 text-gray-900 min-h-25 resize-none"
          value={formData.bio}
          onChange={onInputChange}
        />
      </div>
      <p
        className={`text-xs text-right ${formData.bio.length > 40 ? "text-red-500" : "text-gray-400"}`}
      >
        {formData.bio.length} / 40
      </p>
    </div>
  );
};

export default BattlePreferencesSection;
