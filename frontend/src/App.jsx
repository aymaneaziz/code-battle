import { Route, Routes } from "react-router-dom";
import { SignIn, SignUp } from "@clerk/clerk-react";
import "./App.css";

import { MainLayout } from "./layouts/MainLayout";
import { AuthLayout } from "./layouts/AuthLayout";

// les routes principales
import { Home } from "./features/home/Home";
import { Challenges } from "./features/challenges/Challenges";
import { Missions } from "./features/missions/Missions";
import { Guild } from "./features/guild/Guild";

import { Shop } from "./features/shop/Shop";
import { Leaderboard } from "./features/leaderboard/Leaderboard";
import { AdminPanel } from "./features/admin/AdminPanel";
import { ProtectedRoute } from "./features/admin/components/ProtectedRoute";
import { PlayerSetup } from "./features/playerSetup/PlayerSetup";

import { useUserSync } from "./hooks/useUserSync";

// Correction : On retire "as const" qui est purement TypeScript
const CLERK_COMMON_PROPS = {
  routing: "path",
  fallbackRedirectUrl: "/",
};

const SIGN_IN_PROPS = {
  ...CLERK_COMMON_PROPS,
  path: "/signin",
  signUpUrl: "/signup",
  signUpForceRedirectUrl: "/setup",
};

const SIGN_UP_PROPS = {
  ...CLERK_COMMON_PROPS,
  path: "/signup",
  signInUrl: "/signin",
  forceRedirectUrl: "/setup",
};

function App() {
  // Sync user data with mongodb
  useUserSync();

  return (
    <Routes>
      {/* Ces routes utilisent le MainLayout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/challenges" element={<Challenges />} />
        <Route path="/missions" element={<Missions />} />
        <Route path="/guild" element={<Guild />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/setup" element={<PlayerSetup />} />
        {/* Route protégée */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminPanel />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Ces routes utilisent le AuthLayout */}
      <Route element={<AuthLayout />}>
        <Route path="/signin/*" element={<SignIn {...SIGN_IN_PROPS} />} />
        <Route path="/signup/*" element={<SignUp {...SIGN_UP_PROPS} />} />
      </Route>
    </Routes>
  );
}

export default App;
