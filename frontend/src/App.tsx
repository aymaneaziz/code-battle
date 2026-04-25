import { Route, Routes } from "react-router-dom";
import { SignIn, SignUp } from "@clerk/clerk-react";
import "./App.css";

import { MainLayout } from "./layouts/MainLayout";
import { AuthLayout } from "./layouts/AuthLayout";

import { Home } from "./features/home/Home";
import { Challenges } from "./features/challenges/Challenges";
import { Missions } from "./features/missions/Missions";
import { Guild } from "./features/guild/Guild";
import { Shop } from "./features/shop/Shop";
import { Leaderboard } from "./features/leaderboard/Leaderboard";
import { AdminPanel } from "./features/admin/AdminPanel";
import { ProtectedRoute } from "./features/admin/components/ProtectedRoute";

import { useUserSync } from "./hooks/useUserSync";

function App() {
  // Syncs Clerk user to MongoDB
  useUserSync();

  return (
    <Routes>
      {/* Main app — has Navbar */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/challenges" element={<Challenges />} />
        <Route path="/missions" element={<Missions />} />
        <Route path="/guild" element={<Guild />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route
          path="/admin"
          element={
            <ProtectedRoute requiredRole="admin">
              <AdminPanel />
            </ProtectedRoute>
          }
        />
      </Route>

      {/* Auth pages — no Navbar */}
      <Route element={<AuthLayout />}>
        <Route
          path="/signin"
          element={<SignIn routing="path" path="/signin" />}
        />
        <Route
          path="/signin/sso-callback"
          element={<SignIn routing="path" path="/signin" />}
        />
        <Route
          path="/signup"
          element={<SignUp routing="path" path="/signup" />}
        />
      </Route>
    </Routes>
  );
}

export default App;
