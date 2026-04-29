import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

import { Card, CardContent } from "@/components/ui/card";

const CodingProfileSection = ({
  languages = [],
  experiences = [],
  formData,
  onSelect,
}) => {
  //Katchecki ila kan l'ID deja f l'array, kat-haydo. Ila ma kanch, kat-zidou.
  const handleLanguageToggle = (id) => {
    const currentLangs = Array.isArray(formData.languageId)
      ? formData.languageId
      : [];
    const isSelected = currentLangs.includes(id);

    const newSelection = isSelected
      ? currentLangs.filter((langId) => langId !== id) // Remove if already there
      : [...currentLangs, id]; // Add if not there

    onSelect("languageId", newSelection);
  };

  return (
    <div className="space-y-10">
      {/*LANGUAGES */}
      {/* hadir raha multiple choice  */}
      <div className="space-y-2 pt-6 border-t border-gray-100">
        <div className="flex items-center gap-3">
          <div className="h-6 w-1 bg-cyan-500 rounded-full shadow-sm"></div>
          <h2 className="text-xl font-bold uppercase tracking-tight text-gray-900">
            Preferred Languages
          </h2>
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {languages.map((lang) => {
          const isSelected = formData.languageId?.includes(lang.languageId);

          return (
            <Card
              key={lang.languageId}
              onClick={() => handleLanguageToggle(lang.languageId)}
              className={cn(
                "relative cursor-pointer transition-all duration-300 border-2 overflow-hidden",
                isSelected
                  ? "border-cyan-500 bg-cyan-50/50 scale-[1.02]"
                  : "border-gray-100 hover:border-gray-300",
              )}
            >
              <CardContent className="p-4 flex flex-col items-center gap-3">
                <div className="absolute top-2 right-2">
                  <div
                    className={cn(
                      "h-5 w-5 rounded border flex items-center justify-center transition-colors",
                      isSelected
                        ? "bg-cyan-500 border-cyan-500"
                        : "bg-white border-gray-300",
                    )}
                  >
                    {isSelected && (
                      <Check className="h-3 w-3 text-white stroke-[4px]" />
                    )}
                  </div>
                </div>

                <span className="text-4xl transition-transform hover:scale-110">
                  {lang.iconUrl}
                </span>
                <span
                  className={cn(
                    "text-xs font-bold uppercase tracking-widest",
                    isSelected ? "text-cyan-700" : "text-gray-500",
                  )}
                >
                  {lang.name}
                </span>
              </CardContent>
            </Card>
          );
        })}
        <p className="col-span-2 md:col-span-4 text-xs tracking-widest text-gray-500 mt-2 px-2">
          Select your main language. You can use any language in battles.
        </p>
      </div>

      {/*  EXPERIENCE */}
      {/* Hna player kikhter ghir wehda  m3a description kamla */}
      <div className="space-y-6 pt-6 border-t border-gray-100">
        <div className="flex items-center gap-3">
          <div className="h-6 w-1 bg-purple-500 rounded-full shadow-sm"></div>
          <h2 className="text-xl font-bold uppercase tracking-tight text-gray-900">
            Coding Experience
          </h2>
        </div>

        <div className="grid grid-cols-1 gap-4">
          {experiences.map((exp) => {
            const isSelected = formData.experienceId === exp.experienceId;

            return (
              <Card
                key={exp.experienceId}
                onClick={() => onSelect("experienceId", exp.experienceId)}
                className={cn(
                  "group relative cursor-pointer border-2 transition-all duration-300",
                  isSelected
                    ? "border-purple-500 bg-purple-50/50"
                    : "border-gray-100 hover:bg-gray-50/50",
                )}
              >
                {/* Background Glow Effect */}
                <div className="absolute inset-0 bg-linear-to-r from-purple-100/0 via-purple-100/30 to-purple-100/0 opacity-0 group-hover:opacity-100 transition-opacity" />

                <CardContent className="p-5 relative flex items-center gap-6">
                  {/* Icon Container */}
                  <div
                    className={cn(
                      "flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border-2 text-4xl shadow-inner transition-all duration-500",
                      isSelected
                        ? "bg-white border-purple-300 rotate-3 scale-110"
                        : "bg-gray-50 border-gray-100 group-hover:rotate-3",
                    )}
                  >
                    {exp.iconUrl || "💻"}
                  </div>

                  {/* Text Content */}
                  <div className="flex flex-col gap-1.5 flex-1 pr-4">
                    <div className="flex items-center gap-3">
                      <h4
                        className={cn(
                          "text-lg font-black uppercase tracking-tighter",
                          isSelected ? "text-purple-700" : "text-gray-800",
                        )}
                      >
                        {exp.label}
                      </h4>
                      {isSelected && (
                        <span className="flex h-2 w-2 rounded-full bg-purple-500 animate-pulse" />
                      )}
                    </div>
                    <p className="text-sm text-gray-500 leading-relaxed font-medium">
                      {exp.description ||
                        "System: Initializing warrior description from database..."}
                    </p>
                  </div>

                  {/* Radio indicator */}
                  <div
                    className={cn(
                      "h-7 w-7 rounded-full border-2 flex items-center justify-center transition-all",
                      isSelected
                        ? "border-purple-500 bg-purple-500 text-white"
                        : "border-gray-200 bg-white",
                    )}
                  >
                    {isSelected && <Check className="h-4 w-4 stroke-[4px]" />}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default CodingProfileSection;
