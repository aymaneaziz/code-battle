import { Route, Routes } from "react-router-dom";
import { SignIn, SignUp } from "@clerk/clerk-react";
import "./App.css";

import { MainLayout } from "./layouts/MainLayout";
import { AuthLayout } from "./layouts/AuthLayout";

//les routes principals
import { Home } from "./features/home/Home";
import { Challenges } from "./features/challenges/Challenges";
import { Missions } from "./features/missions/Missions";
import { Guild } from "./features/guild/Guild";
import { Shop } from "./features/shop/Shop";
import { Leaderboard } from "./features/leaderboard/Leaderboard";
import { AdminPanel } from "./features/admin/AdminPanel";
import { ProtectedRoute } from "./features/admin/components/ProtectedRoute";
import { PlayerSetup } from "./features/playerSetup/PlayerSetup";
import { RedirectAfterLogin } from "./service/RedirectAfterLogin";

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
          element={<SignIn
            routing="path" 
            path="/signin"
            fallbackRedirectUrl="/redirect" // Utlisateur enregistré => redirige vers la page de redirection qui gère la logique de redirection en fonction du profil de l'utilisateur
            signUpForceRedirectUrl="/setup" // Si l'utilisateur se connecte pour la première fois, redirige vers la page de configuration du profil
            signUpUrl="/signup" // Si l'utilisateur n'a pas de compte, redirige vers la page d'inscription
          />}
        />
        <Route
          path="/signin/sso-callback"
          element={<SignIn 
            routing="path" 
            path="/signin" 
            fallbackRedirectUrl="/redirect" // Utlisateur enregistré => redirige vers la page de redirection qui gère la logique de redirection en fonction du profil de l'utilisateur
            signUpForceRedirectUrl="/setup" // Si l'utilisateur se connecte pour la première fois, redirige vers la page de configuration du profil
            signUpUrl="/signup" // Si l'utilisateur n'a pas de compte, redirige vers la page d'inscription
          />}
        />
        <Route
          path="/signup"
          element={<SignUp 
            routing="path" 
            path="/signup" 
            fallbackRedirectUrl="/redirect" // Utlisateur enregistré => redirige vers la page de redirection qui gère la logique de redirection en fonction du profil de l'utilisateur
            forceRedirectUrl="/setup" // Si l'utilisateur se connecte pour la première fois, redirige vers la page de configuration du profil
            signInUrl="/signin" // Si l'utilisateur a déjà un compte, redirige vers la page de connexion
          />}
        />
        <Route
          path="/signup/sso-callback"
          element={
            <SignUp
              routing="path"
              path="/signup"
              fallbackRedirectUrl="/redirect" // Utlisateur enregistré => redirige vers la page de redirection qui gère la logique de redirection en fonction du profil de l'utilisateur
              forceRedirectUrl="/setup" // Si l'utilisateur se connecte pour la première fois, redirige vers la page de configuration du profil
              signInUrl="/signin" // Si l'utilisateur a déjà un compte, redirige vers la page de connexion
            />
          }
        />
        <Route path="/redirect" element={<RedirectAfterLogin />} />
        <Route path="/setup" element={<PlayerSetup />} />
      </Route>
    </Routes>
  );
}

export default App;
