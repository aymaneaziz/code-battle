import { NavLink } from "react-router-dom";

const NAV_ITEMS = [
  { to: "/challenges", label: "Challenges" },
  { to: "/missions", label: "Missions" },
  { to: "/guild", label: "Guild" },
  { to: "/shop", label: "Shop" },
  { to: "/leaderboard", label: "Leaderboard" },
];

interface NavLinksProps {
  isAdmin?: boolean;
  vertical?: boolean;
  onNavigate?: () => void;
}

export function NavLinks({ isAdmin, vertical, onNavigate }: NavLinksProps) {
  const base = vertical
    ? "block px-3 py-2 rounded-md text-sm text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
    : "text-sm text-gray-300 hover:text-white transition-colors";

  const activeClass = vertical ? "bg-gray-800 text-white" : "text-white";

  return (
    <>
      {NAV_ITEMS.map(({ to, label }) => (
        <NavLink
          key={to}
          to={to}
          onClick={onNavigate}
          className={({ isActive }) => `${base} ${isActive ? activeClass : ""}`}
        >
          {label}
        </NavLink>
      ))}

      {isAdmin && (
        <NavLink
          to="/admin"
          onClick={onNavigate}
          className={({ isActive }) =>
            `${base} text-red-400 hover:text-red-300 font-semibold ${
              isActive ? "underline underline-offset-2" : ""
            }`
          }
        >
          Admin Panel
        </NavLink>
      )}
    </>
  );
}
