import CodingExperience from "../../models/PlayerSetupModels/codingExperience.model.js";
import { seedData } from "../../config/seederEngine.js";

const codingExperiences = [
  {
    experienceId: "experience1",
    label: "Beginner",
    description: "Just starting out with coding, learning the basics",
    iconUrl: "👶",
  },
  {
    experienceId: "experience2",
    label: "Intermediate",
    description: "Comfortable with coding, can solve common problems",
    iconUrl: "🧑‍💻",
  },
  {
    experienceId: "experience3",
    label: "Advanced",
    description:
      "Experienced coder, can tackle complex problems and algorithms",
    iconUrl: "🧙‍♂️",
  },
];

export const seedCodingExperiences = () =>
  seedData(CodingExperience, codingExperiences, "experienceId");
