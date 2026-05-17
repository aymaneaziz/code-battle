import { Zap } from "lucide-react";

const COMBO_CONFIG = [
  {
    min: 5,
    label: "×1.5",
    color: "text-purple-600",
    bg: "bg-purple-50 border-purple-200",
    glow: "shadow-purple-400/40",
  },
  {
    min: 4,
    label: "×1.35",
    color: "text-indigo-600",
    bg: "bg-indigo-50 border-indigo-200",
    glow: "shadow-indigo-400/40",
  },
  {
    min: 3,
    label: "×1.2",
    color: "text-blue-600",
    bg: "bg-blue-50 border-blue-200",
    glow: "shadow-blue-400/40",
  },
  {
    min: 2,
    label: "×1.1",
    color: "text-teal-600",
    bg: "bg-teal-50 border-teal-200",
    glow: "shadow-teal-400/40",
  },
  {
    min: 0,
    label: "×1.0",
    color: "text-slate-400",
    bg: "bg-slate-50 border-slate-200",
    glow: "",
  },
];

export function ComboDisplay({ combo = 0 }) {
  const config = COMBO_CONFIG.find((c) => combo >= c.min) ?? COMBO_CONFIG[4];
  const isActive = combo >= 2;

  return (
    <div
      className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full border text-xs font-black transition-all duration-300 ${config.bg} ${config.color} ${isActive ? `shadow-md ${config.glow}` : ""}`}
    >
      <Zap
        size={12}
        className={`${isActive ? "fill-current animate-pulse" : "opacity-40"}`}
      />
      <span>{combo > 0 ? `${combo} COMBO` : "NO COMBO"}</span>
      <span className="opacity-60">{config.label}</span>
    </div>
  );
}
