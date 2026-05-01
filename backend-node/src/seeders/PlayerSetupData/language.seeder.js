import Language from "../../models/PlayerSetupModels/language.model.js";

import { seedData } from "../seederEngine.js";

const Languages = [
  { languageId: "lang1", name: "Python", iconUrl: "🐍" },
  { languageId: "lang2", name: "JavaScript", iconUrl: "📜" },
  { languageId: "lang3", name: "Java", iconUrl: "☕" },
  { languageId: "lang4", name: "C++", iconUrl: "💻" },
  { languageId: "lang5", name: "Ruby", iconUrl: "💎" },
  { languageId: "lang6", name: "Go", iconUrl: "🐹" },
  { languageId: "lang7", name: "Rust", iconUrl: "🦀" },
  { languageId: "lang8", name: "TypeScript", iconUrl: "📘" },
];

export const seedLanguages = () => seedData(Language, Languages, "languageId");
