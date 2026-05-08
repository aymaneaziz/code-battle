import Avatar from "../../models/PlayerSetupModels/avatar.model.js";
import { seedData } from "../../config/seederEngine.js";

const avatars = [
  { avatarId: "avatar1", label: "Warrior", iconUrl: "🛡️", isDefault: true },
  { avatarId: "avatar2", label: "Mage", iconUrl: "🔮", isDefault: true },
  { avatarId: "avatar3", label: "Rogue", iconUrl: "🗡️", isDefault: true },
  { avatarId: "avatar4", label: "Archer", iconUrl: "🏹", isDefault: false },
  { avatarId: "avatar5", label: "Healer", iconUrl: "✨", isDefault: false },
  { avatarId: "avatar6", label: "Paladin", iconUrl: "⚔️", isDefault: false },
];

export const seedAvatars = () => seedData(Avatar, avatars, "avatarId");
