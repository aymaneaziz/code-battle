import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App";

import { BrowserRouter } from "react-router-dom";
import { ClerkProvider } from "@clerk/clerk-react";
import { Toaster } from "./components/ui/sonner";

const clerk_publishable_key = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

if (!clerk_publishable_key) {
  throw new Error(
    "VITE_CLERK_PUBLISHABLE_KEY is not found in environment variables",
  );
}

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ClerkProvider publishableKey={clerk_publishable_key}>
      <BrowserRouter>
        <App />
        <Toaster position="bottom-right" richColors />
      </BrowserRouter>
    </ClerkProvider>
  </StrictMode>,
);
