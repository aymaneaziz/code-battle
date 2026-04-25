import { Link } from "react-router-dom";
import {
  SignedIn,
  SignedOut,
  UserButton,
  useAuth,
  useClerk,
} from "@clerk/clerk-react";
// @ts-expect-error - no type declarations for GlobalApi
import api from "../../service/GlobalApi";

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
    <>
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
        <button
          onClick={handleLogout}
          className="px-3 py-1.5 text-sm rounded-md text-gray-400 hover:text-red-400 hover:bg-red-500/10 transition-colors cursor-pointer"
        >
          Logout
        </button>
        <UserButton afterSignOutUrl="/" />
      </SignedIn>
    </>
  );
}
