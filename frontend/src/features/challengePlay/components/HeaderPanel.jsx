import React from "react";
import { Monitor, Settings } from "lucide-react";
import { SUPPORTED_LANGUAGES } from "../services/languages";

const HeaderPanel = ({
  languageId,
  setLanguageId,
  theme,
  setTheme,
  fontSize,
  setFontSize,
}) => {
  return (
    <div className="px-4 py-3 border-b border-slate-100 flex items-center justify-between bg-white shrink-0 w-full">
      {/* Left Branding */}
      <div className="flex items-center gap-3 shrink-0 mr-4">
        <div className="bg-black p-1.5 rounded-lg text-white shadow-sm shadow-blue-200">
          <Monitor size={20} />
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

      {/* Right Controls - Added horizontal scroll for small screens */}
      <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto no-scrollbar pb-1">
        {/* Language Standard Select */}
        <div className="flex flex-col gap-1 shrink-0">
          <label className="text-[10px] uppercase font-bold text-slate-800 tracking-wider">
            Language
          </label>
          <select
            value={languageId}
            onChange={(e) => setLanguageId(Number(e.target.value))}
            className="h-6 w-28 sm:w-36 px-2 text-xs font-bold bg-slate-50 border border-slate-200 rounded-md cursor-pointer outline-none hover:bg-slate-100 transition-colors"
          >
            {SUPPORTED_LANGUAGES.map((lang) => (
              <option key={lang.id} value={lang.id}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>

        {/* Theme Standard Select */}
        <div className="flex flex-col gap-1 shrink-0">
          <label className="text-[10px] uppercase font-extrabold text-slate-800 tracking-wider">
            Theme
          </label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="h-6 w-20 sm:w-24 px-2 text-xs font-bold bg-slate-50 border border-slate-200 rounded-md cursor-pointer outline-none hover:bg-slate-100 transition-colors"
          >
            <option value="vs-dark">Dark</option>
            <option value="light">Light</option>
          </select>
        </div>

        {/* Font Size Slider */}
        <div className="flex flex-col gap-1 w-24 sm:w-28 shrink-0">
          <div className="flex justify-between items-center px-0.5">
            <label className="text-[10px] uppercase font-extrabold text-slate-800 tracking-wider">
              Size
            </label>
            <span className="text-[10px] font-black text-black">
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
    </div>
  );
};

export default HeaderPanel;
