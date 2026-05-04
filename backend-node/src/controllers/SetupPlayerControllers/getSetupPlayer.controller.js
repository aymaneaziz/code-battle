import Avatar from "../../models/PlayerSetupModels/avatar.model.js";
import BattlePreference from "../../models/PlayerSetupModels/battlePreference.model.js";
import CodingExperience from "../../models/PlayerSetupModels/codingExperience.model.js";
import Language from "../../models/PlayerSetupModels/language.model.js";

const getSetupPlayer = async (req, res) => {
  try {
    const [avatars, battlePreferences, codingExperiences, languages] =
      await Promise.all([
        Avatar.find().lean(), //lean() katrj3 l'objet mongoose sous forme de json
        BattlePreference.find().lean(),
        CodingExperience.find().lean(),
        Language.find().lean(),
      ]);

    res.status(200).json({
      success: true,
      data: {
        avatars,
        battlePreferences,
        codingExperiences,
        languages,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Internal Server Error",
      error: error.message,
    });
  }
};

export default getSetupPlayer;
