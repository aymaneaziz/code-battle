import { Route, Routes } from "react-router-dom";
import "./App.css";

import { MainLayout } from "./layouts/MainLayout";
import { AuthLayout } from "./layouts/AuthLayout";

import { Home } from "./pages/Home";
import { Challenges } from "./pages/Challenges";
import { Missions } from "./pages/Missions";
import { Guild } from "./pages/Guild";
import { Shop } from "./pages/Shop";
import { Leaderboard } from "./pages/Leaderboard";

import { SignIn, SignUp } from "@clerk/clerk-react";

function App() {
  return (
    <Routes>
      {/* MAIN APP (WITH NAVBAR) */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/challenges" element={<Challenges />} />
        <Route path="/missions" element={<Missions />} />
        <Route path="/guild" element={<Guild />} />
        <Route path="/shop" element={<Shop />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
      </Route>

      {/* AUTH PAGES (NO NAVBAR) */}
      <Route element={<AuthLayout />}>
        <Route
          path="/signin"
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
