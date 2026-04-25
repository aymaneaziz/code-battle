import { useState } from "react";
import { Link } from "react-router-dom";
import { useUser, SignedIn, SignedOut } from "@clerk/clerk-react";
import logo from "../../assets/Code-Arena.png";
import { NavLinks } from "./NavLinks";
import { NavAuthButtons } from "./NavAuthButtons";

export function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { isSignedIn, user } = useUser();

  const isAdmin = user?.publicMetadata?.role === "admin";

  return (
    <nav className="bg-gray-900 border-b border-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link
            to="/"
            className="flex items-center gap-2 font-bold text-lg text-white"
          >
            <img src={logo} alt="Code Arena" className="h-13 w-auto" />
            <span className="hidden sm:block">Code Arena</span>
          </Link>

          {/* Desktop links */}
          {isSignedIn && (
            <div className="hidden md:flex items-center gap-6">
              <NavLinks isAdmin={isAdmin} />
            </div>
          )}

          {/* Desktop auth */}
          <div className="hidden md:flex items-center gap-3">
            <NavAuthButtons />
          </div>

          {/* Mobile toggle */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            className="md:hidden p-2 rounded-md text-gray-400 hover:text-white hover:bg-gray-800 transition-colors "
            aria-label="Toggle menu"
          >
            {menuOpen ? "✕" : "☰"}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden border-t border-gray-800 py-3 space-y-1">
            {isSignedIn && (
              <NavLinks
                isAdmin={isAdmin}
                vertical
                onNavigate={() => setMenuOpen(false)}
              />
            )}

            <div className="flex flex-col gap-2 pt-3 border-t border-gray-800">
              <SignedOut>
                <Link
                  to="/signin"
                  onClick={() => setMenuOpen(false)}
                  className="block px-3 py-2 text-sm text-center rounded-md bg-blue-600 text-white hover:bg-blue-500 transition-colors"
                >
                  Sign In
                </Link>
                <Link
                  to="/signup"
                  onClick={() => setMenuOpen(false)}
                  className="block px-3 py-2 text-sm text-center rounded-md border border-gray-600 text-gray-300 hover:text-white transition-colors"
                >
                  Sign Up
                </Link>
              </SignedOut>

              <SignedIn>
                <NavAuthButtons />
              </SignedIn>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
