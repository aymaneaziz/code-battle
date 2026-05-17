import { Link } from "react-router-dom";
import {
  SignedOut,
  SignedIn,
  UserButton,
  useAuth,
  useClerk,
} from "@clerk/clerk-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import api from "../../service/GlobalApi";
import { LogOut, User } from "lucide-react";
import wsClient from "@/service/wsClient";
import { cn } from "@/lib/utils";

export function NavAuthButtons({ mobile = false, isBlocked = false }) {
  const { signOut } = useClerk();
  const { getToken } = useAuth();

  const handleLogout = async () => {
    if (isBlocked) return;
    try {
      const token = await getToken();
      await api.post(
        "/user/logout",
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      wsClient.disconnect();
      setTimeout(() => signOut({ redirectUrl: "/" }), 100);
    }
  };

  const containerClasses = cn(
    "flex",
    mobile ? "flex-col gap-2" : "items-center gap-1",
    isBlocked && "opacity-40 pointer-events-none", // Hard block for the whole group
  );

  return (
    <TooltipProvider delayDuration={300}>
      <div className={containerClasses}>
        <SignedOut>
          <Link
            to={isBlocked ? "#" : "/signin"}
            className="px-4 py-1.5 text-sm rounded-md bg-transparent text-gray-300 hover:text-white border border-gray-700 hover:bg-gray-800 transition-colors text-center font-medium"
          >
            Sign In
          </Link>
          <Link
            to={isBlocked ? "#" : "/signup"}
            className="px-4 py-1.5 text-sm rounded-md bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors text-center shadow-xs"
          >
            Sign Up
          </Link>
        </SignedOut>

        <SignedIn>
          {/* My Profile */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                asChild
                disabled={isBlocked}
                variant="ghost"
                size={mobile ? "default" : "icon"}
                className={cn(
                  "transition-all duration-300 ease-in-out",
                  mobile ? "justify-start gap-3 w-full px-4" : "w-9 h-9",
                  "text-gray-400 hover:text-blue-400 hover:bg-blue-500/10",
                  isBlocked && "opacity-40 cursor-not-allowed",
                )}
              >
                <Link to={isBlocked ? "#" : "/profile"}>
                  <User className="h-4 w-4" />
                  {mobile && <span>My Profile</span>}
                </Link>
              </Button>
            </TooltipTrigger>
            {!mobile && <TooltipContent>My Profile</TooltipContent>}
          </Tooltip>

          {/* Logout */}
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                disabled={isBlocked}
                size={mobile ? "default" : "icon"}
                onClick={handleLogout}
                className={cn(
                  "transition-all duration-300 ease-in-out ",
                  mobile ? "justify-start gap-3 w-full px-4" : "w-9 h-9",
                  "text-gray-400 hover:text-red-400 hover:bg-red-500/10 cursor-pointer",
                  isBlocked && "opacity-40 cursor-not-allowed",
                )}
              >
                <LogOut className="h-4 w-4" />
                {mobile && <span>Logout</span>}
              </Button>
            </TooltipTrigger>
            {!mobile && <TooltipContent>Logout</TooltipContent>}
          </Tooltip>

          {/* User Button Wrapper - Clerk logic */}
          <div
            className={cn(
              "flex items-center justify-center h-9 w-9",
              isBlocked && "pointer-events-none select-none grayscale",
            )}
          >
            <UserButton afterSignOutUrl="/" />
          </div>
        </SignedIn>
      </div>
    </TooltipProvider>
  );
}
