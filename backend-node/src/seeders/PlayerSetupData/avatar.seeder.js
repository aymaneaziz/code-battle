import Avatar from "../../models/PlayerSetupModels/avatar.model.js";
import { seedData } from "../seederEngine.js";

const avatars = [
  { avatarId: "avatar1", label: "Warrior", iconUrl: "🛡️", isDefault: true },
  { avatarId: "avatar2", label: "Mage", iconUrl: "🔮", isDefault: true },
  { avatarId: "avatar3", label: "Rogue", iconUrl: "🗡️", isDefault: true },
];

export const seedAvatars = () => seedData(Avatar, avatars, "avatarId");
