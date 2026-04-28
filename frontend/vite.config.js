import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import path from "path"; // Import du module path pour gérer les chemins
import { fileURLToPath } from "url"; // Nécessaire pour simuler __dirname

// Configuration pour récupérer le chemin du dossier actuel
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// https://vite.dev/config/
export default defineConfig({
  plugins: [tailwindcss(), react()],
  resolve: {
    alias: {
      // Lie le symbole "@" au dossier "src" pour des imports propres
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
