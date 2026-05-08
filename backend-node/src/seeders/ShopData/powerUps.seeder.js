import PowerUp from "../../models/ShopModels/powerUp.model.js";
import { seedData } from "../../config/seederEngine.js";

const powerUps = [
  {
    powerUpId: "PU1",
    label: "+30S",
    iconUrl: "⏱",
    description: "Adds 30 seconds to your timer",
    type: "time",
    cooldownSec: 0,
    maxUsesPerMatch: 2,
    effect: {
      type: "add_time",
      value: 30,
    },
  },
  {
    powerUpId: "PU2",
    label: "SPY",
    iconUrl: "🔍",
    description: "Peek at opponent info for 5 seconds",
    type: "vision",
    cooldownSec: 120,
    maxUsesPerMatch: null,
    effect: {
      type: "peek_opponent",
      duration: 5,
    },
  },
  {
    powerUpId: "PU3",
    label: "RUSH",
    iconUrl: "⚡",
    description: "Skip queue and evaluate instantly",
    type: "action",
    cooldownSec: 0,
    maxUsesPerMatch: 2,
    effect: {
      type: "skip_queue",
    },
  },
  {
    powerUpId: "PU4",
    label: "LOCK",
    iconUrl: "🔒",
    description: "Freeze opponent for 30 seconds",
    type: "debuff",
    cooldownSec: 60,
    maxUsesPerMatch: 2,
    effect: {
      type: "freeze_opponent",
      duration: 30,
    },
  },
  {
    powerUpId: "PU5",
    label: "HINT",
    iconUrl: "💡",
    description: "Get a free AI hint",
    type: "hint",
    cooldownSec: 0,
    maxUsesPerMatch: 3,
    effect: {
      type: "hint",
    },
  },
];

export const seedPowerUp = () => seedData(PowerUp, powerUps, "powerUpId");
