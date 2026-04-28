import Avatar from "../../models/PlayerSetupModels/avatar.model.js";
import { seedData } from "../seederEngine.js";

const avatars = [
  { avatarId: "avatar1", label: "Warrior", iconUrl: "🛡️" },
  { avatarId: "avatar2", label: "Mage", iconUrl: "🔮" },
  { avatarId: "avatar3", label: "Rogue", iconUrl: "🗡️" },
];

export const seedAvatars = () => seedData(Avatar, avatars, "avatarId");
