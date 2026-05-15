import { Link, NavLink, useLocation } from "react-router-dom";
import { useUser, SignedIn } from "@clerk/clerk-react";
import logo from "../../assets/Code-Arena.svg";
import { NavLinks } from "./NavLinks";
import { NavAuthButtons } from "./NavAuthButtons";

import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Coins, Gem, Menu, Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { usePlayerInfo } from "@/hooks/usePlayerInfo";

export function Navbar() {
  const { isSignedIn, user } = useUser();
  const location = useLocation();
  const isAdmin = user?.publicMetadata?.role === "admin";
  const state = usePlayerInfo();
  const stats = state?.stats;

  const isBlocked =
    location.pathname === "/matchmaking" ||
    location.pathname.startsWith("/match/");

  return (
    <nav className="bg-gray-900 border-b border-gray-800 text-white sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between gap-4">
        {/* Left: Logo */}
        <Link
          to={isBlocked ? "#" : "/"}
          className={cn(
            "flex items-center gap-2 transition-opacity shrink-0",
            isBlocked ? "cursor-not-allowed opacity-50" : "hover:opacity-80",
          )}
          onClick={(e) => isBlocked && e.preventDefault()}
        >
          <img src={logo} alt="Code Arena" className="h-10 w-auto" />
          <span className="hidden sm:block font-black text-xl tracking-tighter text-white uppercase">
            Code <span className="text-blue-500">Arena</span>
          </span>
        </Link>

        {/* Center: Nav links — desktop only */}
        {isSignedIn && (
          <div className="hidden md:flex flex-1 justify-center">
            <NavLinks isAdmin={isAdmin} isBlocked={isBlocked} />
          </div>
        )}

        {/* Right: Stats + Auth */}
        <div className="flex items-center gap-2 shrink-0">
          {/* Coins + XP pills */}
          {isSignedIn && stats && (
            <div className="hidden md:flex items-center gap-1.5">
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-indigo-600/10 border border-indigo-600/20 h-8">
                <Gem className="w-3 h-3 text-indigo-600" />
                <span className="text-indigo-400 text-xs font-bold tabular-nums leading-none">
                  {stats.gems ?? 0}
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-yellow-500/10 border border-yellow-500/20 h-8">
                <Coins className="w-3 h-3 text-yellow-500 shrink-0" />
                <span className="text-yellow-300 text-xs font-bold tabular-nums leading-none">
                  {stats.coins ?? 0}
                </span>
              </div>
              <div className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-blue-500/10 border border-blue-500/20 h-8">
                <Zap className="w-3 h-3 text-blue-500 shrink-0" />
                <span className="text-blue-400 text-xs font-bold tabular-nums leading-none">
                  {stats.xp ?? 0} XP
                </span>
              </div>
            </div>
          )}

          {/* Desktop auth buttons */}
          <div className="hidden md:flex">
            <NavAuthButtons isBlocked={isBlocked} />
          </div>

          {/* Mobile hamburger */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button
                  disabled={isBlocked}
                  variant="ghost"
                  size="icon"
                  className="text-gray-400 hover:text-white hover:bg-gray-800 w-9 h-9"
                >
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>

              <SheetContent
                side="right"
                className="bg-gray-900 border-gray-800 text-white w-72 flex flex-col p-0"
              >
                {/* Sheet header */}
                <SheetHeader className="px-5 pt-5 pb-4 border-b border-gray-800">
                  <SheetTitle asChild>
                    <Link
                      to={isBlocked ? "#" : "/"}
                      className="flex items-center gap-2"
                    >
                      <img src={logo} alt="Code Arena" className="h-8 w-auto" />
                      <span className="font-black text-lg tracking-tighter text-white uppercase">
                        Code <span className="text-blue-500">Arena</span>
                      </span>
                    </Link>
                  </SheetTitle>
                </SheetHeader>

                <div className="flex-1 overflow-y-auto px-4 py-4 space-y-6">
                  {/* Mobile stats */}
                  {isSignedIn && stats && (
                    <div className="flex gap-2">
                      <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-indigo-600/10 border border-indigo-600/20 flex-1 justify-center">
                        <Gem className="w-3 h-3 text-indigo-600" />
                        <span className="text-indigo-400 text-xs font-bold">
                          {stats.gems ?? 0}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-yellow-500/10 border border-yellow-500/20 flex-1 justify-center">
                        <Coins className="w-3 h-3 text-yellow-500 shrink-0" />
                        <span className="text-yellow-300 text-xs font-bold">
                          {stats.coins ?? 0}
                        </span>
                      </div>
                      <div className="flex items-center gap-1.5 px-3 py-2 rounded-lg bg-blue-500/10 border border-blue-500/20 flex-1 justify-center">
                        <Zap className="w-3 h-3 text-blue-500" />
                        <span className="text-blue-400 text-xs font-bold">
                          {stats.xp ?? 0} XP
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Home link */}
                  <div>
                    <p className="text-gray-600 text-[10px] uppercase tracking-widest font-bold px-2 mb-2">
                      Navigation
                    </p>

                    {isSignedIn && (
                      <NavLinks
                        isAdmin={isAdmin}
                        isBlocked={isBlocked}
                        vertical
                      />
                    )}
                  </div>

                  {/* Auth buttons at bottom of scroll area */}
                  {isSignedIn && (
                    <div>
                      <p className="text-gray-600 text-[10px] uppercase tracking-widest font-bold px-2 mb-2">
                        Account
                      </p>
                      <NavAuthButtons mobile isBlocked={isBlocked} />
                    </div>
                  )}

                  {!isSignedIn && <NavAuthButtons mobile />}
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
