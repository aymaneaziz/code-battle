import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

const AvatarSelectorSection = ({ avatars = [], selectedId, onSelect }) => {
  const selectedAvatar = avatars.find((a) => a._id === selectedId);
  const previewContent = selectedAvatar?.iconUrl || "?";

  return (
    <div className="flex flex-col items-center gap-8 py-4">
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-black tracking-tighter uppercase text-gray-900">
          Avatar
        </h3>
        <div className="h-1 w-12 bg-cyan-500 mx-auto rounded-full"></div>
      </div>

      {/* Preview m3a glow dynam */}
      <div className="relative">
        {/* darna l pulse khfif */}
        <div className="relative flex h-36 w-36 items-center justify-center rounded-full bg-gray-50 border-4 border-cyan-500 shadow-md text-7xl transition-transform duration-500 hover:scale-105">
          {previewContent}
        </div>
      </div>

      {/* Grid bla hauteur fixe bach  t adapta  m3a contenu */}
      <div className="w-full space-y-4">
        <p className="text-[10px] text-center font-bold uppercase tracking-[0.2em] text-gray-500">
          Choose your Avatar
        </p>
        <div className="grid grid-cols-2 gap-3 overflow-y-auto max-h-100 pr-2 custom-scrollbar">
          {avatars.map((avatar) => {
            const isSelected = selectedId === avatar._id;
            return (
              <Card
                key={avatar._id}
                onClick={() => onSelect("avatarId", avatar._id)}
                className={cn(
                  "flex flex-col items-center p-4 cursor-pointer transition-all duration-300 border-2",
                  // ila kan selectionné ndiro fond zreg mftou7
                  isSelected
                    ? "border-cyan-500 bg-cyan-50 shadow-sm"
                    : "border-gray-200 bg-white hover:border-gray-300 hover:bg-gray-50",
                )}
              >
                <span className="text-3xl mb-2 grayscale-[0.5] group-hover:grayscale-0">
                  {avatar.iconUrl}
                </span>
                <p
                  className={cn(
                    "text-[10px] font-bold uppercase tracking-widest",
                    // couleur d text hta hya tbedl
                    isSelected ? "text-cyan-600" : "text-gray-500",
                  )}
                >
                  {avatar.label}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AvatarSelectorSection;
