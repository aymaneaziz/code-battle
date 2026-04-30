import { NavLink } from "react-router-dom";
import { cn } from "@/lib/utils";

const NAV_ITEMS = [
  { to: "/challenges", label: "Challenges" },
  { to: "/missions", label: "Missions" },
  { to: "/guild", label: "Guild" },
  { to: "/shop", label: "Shop" },
  { to: "/leaderboard", label: "Leaderboard" },
];

export function NavLinks({ isAdmin, vertical, onNavigate }) {
  // Styles de base li kytbdlo 3la hsab vertical (mobile) ou horizontal (desktop)
  const baseStyle = vertical
    ? "flex items-center w-full px-4 py-3 text-base font-medium rounded-lg transition-colors"
    : "text-sm font-medium transition-colors hover:text-white";

  return (
    <div
      className={cn(
        "flex",
        vertical ? "flex-col gap-2" : "items-center gap-6 text-gray-400",
      )}
    >
      {NAV_ITEMS.map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          onClick={onNavigate}
          className={({ isActive }) =>
            cn(
              baseStyle,
              isActive
                ? vertical
                  ? "bg-gray-800 text-white"
                  : "text-white underline underline-offset-8 decoration-blue-500 decoration-2"
                : "text-gray-400 hover:text-gray-200",
            )
          }
        >
          {label}
        </NavLink>
      ))}

      {isAdmin && (
        <NavLink
          to="/admin"
          onClick={onNavigate}
          className={({ isActive }) =>
            cn(
              baseStyle,
              "text-red-400 hover:text-red-300 border-red-900/50",
              isActive &&
                (vertical ? "bg-red-500/10" : "text-red-300 font-bold"),
            )
          }
        >
          Admin Panel
        </NavLink>
      )}
    </div>
  );
}
