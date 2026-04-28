// src/components/AvatarSelector.jsx

import { Card } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

const AvatarSelector = ({ avatars = [], selectedId, onSelect }) => {
  //  kanjibo l'avatar li selectionna bach naffichiw preview
  const selectedAvatar = avatars.find((a) => a.avatarId === selectedId);

  // fallback ila makanch avatar
  const previewContent = selectedAvatar?.iconUrl || "?";

  return (
    <div className="flex flex-col items-center gap-6">
      {/* Header */}
      <div className="text-center space-y-1">
        <h3 className="text-xl font-bold tracking-tight uppercase">Avatar</h3>
        <p className="text-xs text-muted-foreground">
          Identify yourself in the arena
        </p>
      </div>

      {/* Preview Avatar */}
      <div className="relative group ">
        {/* glow effect bach yban mzyan */}
        <div className="absolute -inset-1 bg-linear-to-r from-blue-600 to-cyan-500 rounded-full blur opacity-25 group-hover:opacity-50 transition duration-1000"></div>

        {/* avatar display */}
        <div className="relative flex h-32 w-32 items-center justify-center rounded-full bg-background border-2 border-primary shadow-xl text-6xl">
          {previewContent}
        </div>
      </div>

      {/* List dyal avatars */}
      <div className="h-80 w-full px-2">
        <div className="grid grid-cols-2 gap-3 pb-4">
          {/*  ila ma kaynach avatars */}
          {avatars.length === 0 && (
            <p className="col-span-2 text-center text-muted-foreground text-sm">
              Aucun avatar disponible
            </p>
          )}

          {avatars.map((avatar) => {
            const isSelected = selectedId === avatar.avatarId;

            return (
              <Card
                key={avatar.avatarId}
                // click pour sélectionner avatar
                onClick={() => onSelect("avatarId", avatar.avatarId)}
                className={cn(
                  "flex flex-col items-center p-3 cursor-pointer transition-all duration-200 hover:scale-105",
                  isSelected
                    ? "border-primary bg-primary/10 ring-1 ring-primary"
                    : "bg-card/50 hover:bg-accent",
                )}
              >
                {/* fallback ila iconUrl khawi */}
                <span className="text-3xl mb-2">{avatar.iconUrl || "?"}</span>

                <p className="text-[10px] font-black uppercase tracking-tighter truncate w-full text-center">
                  {avatar.label || "Unknown"}
                </p>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default AvatarSelector;
