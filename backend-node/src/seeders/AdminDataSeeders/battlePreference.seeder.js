import battlePreference from "../../models/AdminData/battlePreference.model.js";
import connectToDatabase from "../../database/mongodb.js";

const battlePreferenceSeeder = async () => {
    try {
        await connectToDatabase();
        const battlePreferences = [{
            preferenceId: "preference1",
            label: "Easy",
            description: "Learn the ropes with easier opponents and challenges",
            iconUrl: "😊",
        },
        {
            preferenceId: "preference2",
            label: "Medium",
            description: "Challenge yourself with moderately difficult opponents and problems",
            iconUrl: "😐",
        },
        {
            preferenceId: "preference3",
            label: "Hard",
            description: "Test your skills against tough opponents and complex problems",
            iconUrl: "😠",
        }
        ];

        await battlePreference.deleteMany();
        await battlePreference.insertMany(battlePreferences);

        console.log("Seeder terminé");
        process.exit(0);
    } catch (error) {
        console.error("Erreur lors du seeding:", error);
        process.exit(1);
    }
};

battlePreferenceSeeder();