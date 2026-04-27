import Language from "../../models/AdminData/language.model.js";
import connectToDatabase from "../../database/mongodb.js";

const languageSeeder = async () => {
  try {
    await connectToDatabase();
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

    await Language.deleteMany();
    await Language.insertMany(Languages);

    console.log("Seeder terminé");
    process.exit(0);
  } catch (error) {
    console.error("Erreur lors du seeding:", error);
    process.exit(1);
  }
};

languageSeeder();
