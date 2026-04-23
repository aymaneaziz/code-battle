import { useState } from "react";
import { NavLink, Link } from "react-router-dom";
import { SignedIn, SignedOut, UserButton } from "@clerk/clerk-react";
import logo from "../assets/code-arena-logo.png";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const navLinks = [
    { to: "/challenges", label: "Challenges" },
    { to: "/missions", label: "Missions" },
    { to: "/guild", label: "Guild" },
    { to: "/shop", label: "Shop" },
    { to: "/leaderboard", label: "Leaderboard" },
  ];

  const baseLink = "transition-colors hover:text-blue-400";
  const activeLink = "text-blue-400";

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 shadow-md">
      <div className="flex items-center justify-between max-w-7xl mx-auto">
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-2 font-bold text-xl">
          <img src={logo} alt="logo" className="h-10" />
          <span className="hidden sm:block">Code Arena</span>
        </Link>

        {/* CENTER LINKS */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `${baseLink} ${isActive ? activeLink : ""}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* RIGHT SIDE */}
        <div className="hidden md:flex items-center gap-3">
          <SignedOut>
            <Link
              to="/signin"
              className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition"
            >
              Sign In
            </Link>

            <Link
              to="/signup"
              className="px-4 py-2 rounded-lg border border-white hover:bg-white hover:text-black transition"
            >
              Sign Up
            </Link>
          </SignedOut>

          <SignedIn>
            <UserButton afterSignOutUrl="/" />
          </SignedIn>
        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="md:hidden p-2 rounded-lg hover:bg-gray-800 transition"
        >
          {isOpen ? "✕" : "☰"}
        </button>
      </div>

      {/* MOBILE MENU */}
      {isOpen && (
        <div className="md:hidden mt-4 space-y-2">
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setIsOpen(false)}
              className={({ isActive }) =>
                `block px-4 py-2 rounded-lg ${
                  isActive ? "bg-blue-500" : "hover:bg-gray-800"
                }`
              }
            >
              {link.label}
            </NavLink>
          ))}

          <SignedOut>
            <Link
              to="/signin"
              onClick={() => setIsOpen(false)}
              className="block text-center bg-blue-500 px-4 py-2 rounded-lg hover:bg-blue-600"
            >
              Sign In
            </Link>

            <Link
              to="/signup"
              onClick={() => setIsOpen(false)}
              className="block text-center border border-white px-4 py-2 rounded-lg hover:bg-white hover:text-black"
            >
              Sign Up
            </Link>
          </SignedOut>

          <SignedIn>
            <div className="flex justify-center pt-2">
              <UserButton afterSignOutUrl="/" />
            </div>
          </SignedIn>
        </div>
      )}
    </nav>
  );
};
