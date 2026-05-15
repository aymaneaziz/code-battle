import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

export const EditingSection = ({ formData, setFormData, unlockedAvatars }) => {
  const MAX_BIO_LENGTH = 40; // Limite fixée

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="p-6 rounded-xl border border-slate-200 bg-white shadow-sm space-y-6 animate-in fade-in duration-300">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Avatar Picker */}
        <div className="space-y-3">
          <label className="text-xs font-bold uppercase text-slate-600">
            Change Avatar
          </label>
          <ScrollArea className="h-40 w-full rounded-lg border border-slate-100 p-2 bg-slate-50">
            <div className="grid grid-cols-5 gap-2">
              {unlockedAvatars?.map((avatar) => (
                <button
                  key={avatar._id}
                  type="button"
                  onClick={() =>
                    setFormData((p) => ({ ...p, selectedAvatar: avatar._id }))
                  }
                  className={cn(
                    "aspect-square rounded-md border-2 flex items-center justify-center p-1 transition-all bg-white ",
                    formData.selectedAvatar === avatar._id
                      ? "border-slate-900 scale-95 shadow-sm"
                      : "border-slate-300 opacity-60 hover:opacity-100 hover:border-slate-300 ",
                  )}
                >
                  <div
                    className="w-full h-full flex items-center justify-center text-slate-800 cursor-pointer"
                    dangerouslySetInnerHTML={{ __html: avatar.iconUrl }}
                  />
                </button>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Fields Display Name & Location */}
        <div className="space-y-4">
          <div>
            <Label className="text-[11px] font-bold text-slate-800 uppercase tracking-wider">
              Display Name
            </Label>
            <Input
              name="displayName"
              value={formData.displayName}
              onChange={handleInputChange}
              className="mt-1"
            />
          </div>
          <div>
            <label className="text-[11px] font-bold text-slate-800 uppercase tracking-wider">
              Location
            </label>
            <Input
              name="location"
              value={formData.location}
              onChange={handleInputChange}
              className="mt-1"
            />
          </div>
        </div>

        {/* Bio Section with Character Count */}
        <div className="md:col-span-2 space-y-1">
          <div className="flex justify-between items-end">
            <label className="text-[11px] font-bold text-slate-800 uppercase tracking-wider">
              Bio
            </label>
            {/* Le compteur de caractères dynamique */}
            <span
              className={cn(
                "text-[10px] font-medium transition-colors",
                formData.bio.length >= MAX_BIO_LENGTH
                  ? "text-red-500 font-bold"
                  : "text-slate-800",
                formData.bio.length >= MAX_BIO_LENGTH * 0.9 &&
                  formData.bio.length < MAX_BIO_LENGTH
                  ? "text-orange-500"
                  : "",
              )}
            >
              {formData.bio.length} / {MAX_BIO_LENGTH}
            </span>
          </div>

          <Textarea
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
            maxLength={MAX_BIO_LENGTH}
            placeholder="Tell the arena who you are ... (max 120 chars)"
            className={cn(
              "mt-1 resize-none h-24 transition-all focus-visible:ring-1",
              formData.bio.length >= MAX_BIO_LENGTH
                ? "border-red-200 focus-visible:ring-red-500"
                : "focus-visible:ring-slate-400",
            )}
          />
        </div>
      </div>
    </div>
  );
};
