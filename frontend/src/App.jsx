import { Navigate, Route, Routes } from "react-router-dom";
import { SignIn, SignUp } from "@clerk/clerk-react";
import "./App.css";

import { MainLayout } from "./layouts/MainLayout";
import { AuthLayout } from "./layouts/AuthLayout";

// les routes principales
import Home from "./features/home/Home";
import Challenges from "./features/challenges/Challenges";
import { Missions } from "./features/missions/Missions";
import { Guild } from "./features/guild/Guild";

import { Shop } from "./features/shop/Shop";
import { Leaderboard } from "./features/leaderboard/Leaderboard";
import { AdminPanel } from "./features/admin/AdminPanel";
import { AdminProtectedRoute } from "./features/admin/components/AdminProtectedRoute";
import { PlayerSetup } from "./features/playerSetup/PlayerSetup";

import { useUserSync } from "./hooks/useUserSync";
import { PlayerProtectedRoute } from "./features/playerSetup/components/PlayerProtectedRoute";
import { PlayerProfile } from "./features/playerProfile/PlayerProfile";
import { SetupCompletedProtectedRoute } from "./features/playerSetup/components/SetupCompletedProtectedRoute";
import { SetupNotCompletedProtectedRoute } from "./features/playerSetup/components/SetupNotCompletedProtectedRoute";
import ChallengePlay from "./features/challengePlay/ChallengePlay";
import MatchMaking from "./features/matchMaking/MatchMaking";
import { Match } from "./features/match/Match";
import { use } from "react";
import { useWsConnection } from "./hooks/useWsConnection";
import { MatchProtectedRoute } from "./features/matchMaking/components/MatchProtectedRoute";
import { ChallengeProtectedRoute } from "./features/challengePlay/components/ChallengeProtectedRoute";
import { MatchMakingProtectedRoute } from "./features/matchMaking/components/MatchMakingProtectedRoute";

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
  // Connect to WebSocket server on app load
  useWsConnection();

  return (
    <Routes>
      {/* Ces routes utilisent le MainLayout */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        {/* Protected player routes */}
        <Route element={<PlayerProtectedRoute />}>
          <Route
            path="/challenges/:challengeId"
            element={
              <ChallengeProtectedRoute>
                <ChallengePlay />
              </ChallengeProtectedRoute>
            }
          />
          <Route path="/challenges" element={<Challenges />} />

          <Route
            path="/match/:matchId"
            element={
              <MatchProtectedRoute>
                <Match />
              </MatchProtectedRoute>
            }
          />
          <Route
            path="/matchmaking"
            element={
              <MatchMakingProtectedRoute>
                <MatchMaking />
              </MatchMakingProtectedRoute>
            }
          />

          <Route path="/missions" element={<Missions />} />
          <Route path="/guild" element={<Guild />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/leaderboard" element={<Leaderboard />} />

          <Route
            path="/profile"
            element={
              <SetupCompletedProtectedRoute>
                <PlayerProfile />
              </SetupCompletedProtectedRoute>
            }
          />

          <Route
            path="/setup"
            element={
              <SetupNotCompletedProtectedRoute>
                <PlayerSetup />
              </SetupNotCompletedProtectedRoute>
            }
          />
        </Route>

        {/* Route admin  protégée */}
        <Route
          path="/admin"
          element={
            <AdminProtectedRoute requiredRole="admin">
              <AdminPanel />
            </AdminProtectedRoute>
          }
        />
      </Route>

      {/* Ces routes utilisent le AuthLayout */}
      <Route element={<AuthLayout />}>
        <Route path="/signin/*" element={<SignIn {...SIGN_IN_PROPS} />} />
        <Route path="/signup/*" element={<SignUp {...SIGN_UP_PROPS} />} />
      </Route>

      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}

export default App;
