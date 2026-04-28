import BattlePreference from "../../models/PlayerSetupModels/battlePreference.model.js";
import { seedData } from "../seederEngine.js";

const battlePreferences = [
  {
    preferenceId: "preference1",
    label: "Easy",
    description: "Learn the ropes with easier opponents and challenges",
    iconUrl: "😊",
  },
  {
    preferenceId: "preference2",
    label: "Medium",
    description:
      "Challenge yourself with moderately difficult opponents and problems",
    iconUrl: "😐",
  },
  {
    preferenceId: "preference3",
    label: "Hard",
    description:
      "Test your skills against tough opponents and complex problems",
    iconUrl: "😠",
  },
];

export const seedBattlePreferences = () =>
  seedData(BattlePreference, battlePreferences, "preferenceId");
