import { Link } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  UserButton,
  useAuth,
  useClerk,
} from "@clerk/clerk-react";
import { Button } from "@/components/ui/button"; // Shadcn Button
import api from "../../service/GlobalApi";
import { LogOut, User } from "lucide-react";

export function NavAuthButtons() {
  const { signOut } = useClerk();
  const { getToken } = useAuth();

  const handleLogout = async () => {
    try {
      const token = await getToken();
      await api.post(
        "/user/logout",
        {},
        { headers: { Authorization: `Bearer ${token}` } },
      );
    } catch (err) {
      console.error("Logout error:", err);
    } finally {
      signOut({ redirectUrl: "/" });
    }
  };

  return (
    <div className="flex items-center gap-3">
      <SignedOut>
        <Link
          to="/signin"
          className="px-4 py-1.5 text-sm rounded-md bg-blue-600 text-white hover:bg-blue-500 transition-colors"
        >
          Sign In
        </Link>

        <Link
          to="/signup"
          className="px-4 py-1.5 text-sm rounded-md border border-gray-600 text-gray-300 hover:border-gray-400 hover:text-white transition-colors"
        >
          Sign Up
        </Link>
      </SignedOut>

      <SignedIn>
        {/* Hna lbouton li ghadi idik l page de profil dyalk  */}
        <Button
          asChild
          variant="ghost"
          className="text-gray-400 hover:text-blue-400 hover:bg-blue-500/10  gap-2"
        >
          <Link to="/profile">
            <User className="h-4 w-4" />
            <span className="hidden lg:inline">My Profile</span>
          </Link>
        </Button>
        {/* Bouton Logout b style Shadcn  */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          className="text-gray-400 hover:text-red-400 hover:bg-red-500/10 gap-2 cursor-pointer"
        >
          <LogOut className="h-4 w-4" />
          <span className="hidden lg:inline">Logout</span>
          {/* Katban ghir f l'ecran kbir */}
        </Button>

        <UserButton
          afterSignOutUrl="/"
          appearance={{
            elements: { userButtonAvatarBox: "h-9 w-9 border border-gray-700" },
          }}
        />
      </SignedIn>
    </div>
  );
}
