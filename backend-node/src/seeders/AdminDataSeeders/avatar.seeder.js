import Avatar from "../../models/AdminData/avatar.model.js";
import connectToDatabase from "../../database/mongodb.js";

const avatarSeeder = async () => {
    try {
        await connectToDatabase();
        const avatars = [
            {avatarId: "avatar1", label: "Warrior", iconUrl: "🛡️"},
            {avatarId: "avatar2", label: "Mage", iconUrl: "🔮"},
            {avatarId: "avatar3", label: "Rogue", iconUrl: "🗡️"}
        ];

        await Avatar.deleteMany();
        await Avatar.insertMany(avatars);

        console.log("Seeder terminé");
        process.exit(0);
    } catch (error) {
        console.error("Erreur lors du seeding:", error);
        process.exit(1);
    }
};

avatarSeeder();