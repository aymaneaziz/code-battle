import { useState } from "react";
import { Link } from "react-router-dom";
import { useUser, SignedIn } from "@clerk/clerk-react";
import logo from "../../assets/Code-Arena.svg";
import { NavLinks } from "./NavLinks";
import { NavAuthButtons } from "./NavAuthButtons";

// Shadcn UI
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Menu } from "lucide-react";

export function Navbar() {
  const { isSignedIn, user } = useUser();
  const isAdmin = user?.publicMetadata?.role === "admin";

  return (
    <nav className="sticky top-0 z-50 w-full bg-gray-950/80 backdrop-blur-md border-b border-gray-800 shadow-sm shadow-blue-500/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
        {/* Left Side: Logo */}
        <Link
          to="/"
          className="flex items-center gap-2 transition-opacity hover:opacity-80"
        >
          <img src={logo} alt="Code Arena" className="h-10 w-auto" />
          <span className="hidden sm:block font-black text-xl tracking-tighter text-white uppercase">
            Code <span className="text-blue-500">Arena</span>
          </span>
        </Link>

        {/* Center: Desktop Links (Only if signed in) */}
        {isSignedIn && (
          <div className="hidden md:block">
            <NavLinks isAdmin={isAdmin} />
          </div>
        )}

        {/* Right Side: Desktop auth & mobile Toggle */}
        <div className="flex items-center gap-2">
          <div className="hidden md:flex">
            <NavAuthButtons />
          </div>

          {/* Mobile menu b shadcn sheet  */}
          <div className="md:hidden">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="text-gray-400">
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="bg-gray-900 border-gray-800 text-white w-[300px]"
              >
                <SheetHeader className="text-left pb-6">
                  <SheetTitle className="text-white uppercase tracking-widest text-sm opacity-50">
                    Menu
                  </SheetTitle>
                </SheetHeader>

                <div className="space-y-6">
                  {isSignedIn && <NavLinks isAdmin={isAdmin} vertical />}

                  <div className="pt-6 border-t border-gray-800">
                    <NavAuthButtons />
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
}
