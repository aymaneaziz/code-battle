import codingExperience from "../../models/AdminData/codingExperience.model.js";
import connectToDatabase from "../../database/mongodb.js";

const codingExperienceSeeder = async () => {
  try {
    await connectToDatabase();
    const codingExperiences = [
    {
      experienceId: "experience1",
      label: "Beginner",
      description: "Just starting out with coding, learning the basics",
      iconUrl: "👶"
    },
    {
      experienceId: "experience2",
      label: "Intermediate",
      description: "Comfortable with coding, can solve common problems",
      iconUrl: "🧑‍💻"
    },
    {
      experienceId: "experience3",
      label: "Advanced",
      description: "Experienced coder, can tackle complex problems and algorithms",
      iconUrl: "🧙‍♂️"
      }
    ];

    await codingExperience.deleteMany();
    await codingExperience.insertMany(codingExperiences);

    console.log("Seeder terminé");
    process.exit(0);
  } catch (error) {
    console.error("Erreur lors du seeding:", error);
    process.exit(1);
  }
};

codingExperienceSeeder();