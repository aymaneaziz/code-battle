import React from "react";
import { Monitor, Hash, Activity } from "lucide-react";
import { Badge } from "@/components/ui/badge";

const COMPLEXITY_STYLE = {
  "O(1)": {
    bg: "bg-green-100 hover:bg-green-100",
    text: "text-green-700",
    border: "border-green-200",
  },
  "O(log n)": {
    bg: "bg-teal-100 hover:bg-teal-100",
    text: "text-teal-700",
    border: "border-teal-200",
  },
  "O(n)": {
    bg: "bg-blue-100 hover:bg-blue-100",
    text: "text-blue-700",
    border: "border-blue-200",
  },
  "O(n log n)": {
    bg: "bg-yellow-100 hover:bg-yellow-100",
    text: "text-yellow-700",
    border: "border-yellow-200",
  },
  "O(n²)": {
    bg: "bg-orange-100 hover:bg-orange-100",
    text: "text-orange-700",
    border: "border-orange-200",
  },
  "O(n³+)": {
    bg: "bg-red-100 hover:bg-red-100",
    text: "text-red-700",
    border: "border-red-200",
  },
};

const HeaderPanel = ({
  languageId,
  setLanguageId,
  availableLanguages,
  theme,
  setTheme,
  fontSize,
  setFontSize,
  lineCount,
  complexity,
}) => {
  const cx = complexity
    ? (COMPLEXITY_STYLE[complexity] ?? COMPLEXITY_STYLE["O(n³+)"])
    : null;

  return (
    <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-white shrink-0 w-full gap-4">
      {/* 1. Branding (Left) */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="bg-black p-1.5 rounded-lg text-white">
          <Monitor size={18} />
        </div>
        <div className="hidden sm:block">
          <h2 className="text-sm font-black text-slate-800 leading-none tracking-tight">
            Code Compiler
          </h2>
          <span className="text-[9px] text-slate-400 font-bold uppercase tracking-widest">
            Execution Environment
          </span>
        </div>
      </div>

      {/* 2. Controls (Middle/Right) */}
      <div className="flex items-center gap-4 sm:gap-5 overflow-x-auto no-scrollbar ml-auto">
        {/* Language Select */}
        <div className="flex flex-col gap-1 shrink-0">
          <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
            Language
          </label>
          <select
            value={languageId ?? ""}
            onChange={(e) => setLanguageId(Number(e.target.value))}
            className="h-7 w-28 sm:w-36 px-2 text-xs font-bold bg-slate-50 border border-slate-200 rounded-md cursor-pointer outline-none hover:bg-slate-100 transition-colors"
          >
            {availableLanguages.map((lang) => (
              <option key={lang.id} value={lang.id}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        {/* Theme Select */}
        <div className="flex flex-col gap-1 shrink-0">
          <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
            Theme
          </label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="h-7 w-20 sm:w-24 px-2 text-xs font-bold bg-slate-50 border border-slate-200 rounded-md cursor-pointer outline-none hover:bg-slate-100 transition-colors"
          >
            <option value="vs-dark">Dark</option>
            <option value="light">Light</option>
          </select>
        </div>

        {/* Font Size Slider */}
        <div className="flex flex-col gap-1 w-24 sm:w-28 shrink-0">
          <div className="flex justify-between items-center">
            <label className="text-[10px] uppercase font-bold text-slate-500 tracking-wider">
              Size
            </label>
            <span className="text-[10px] font-black text-slate-800">
              {fontSize}px
            </span>
          </div>
          <input
            type="range"
            min="12"
            max="24"
            step="1"
            value={fontSize}
            onChange={(e) => setFontSize(Number(e.target.value))}
            className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-black"
          />
        </div>
      </div>

      {/* 3. Code Stats (Far Right) */}
      <div className="hidden md:flex items-center gap-2 shrink-0 border-l border-slate-100 pl-4">
        <Badge
          variant="secondary"
          className="flex items-center gap-1.5 px-2.5 py-1 font-bold bg-slate-100 text-slate-600 border-slate-200 whitespace-nowrap"
        >
          <Hash size={12} className="opacity-70" />
          <span>LINES: {lineCount}</span>
        </Badge>

        {cx && (
          <Badge
            variant="outline"
            className={`flex items-center gap-1.5 px-2.5 py-1 font-bold ${cx.bg} ${cx.text} border-slate-200 whitespace-nowrap`}
          >
            <Activity size={12} className="opacity-70" />
            <span>{complexity}</span>
          </Badge>
        )}
      </div>
    </div>
  );
};

export default HeaderPanel;
