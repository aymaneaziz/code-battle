import Avatar from "../models/AdminData/avatar.model.js";
import BattlePreference from "../models/AdminData/battlePreference.model.js";
import CodingExperience from "../models/AdminData/codingExperience.model.js";
import Language from "../models/AdminData/language.model.js";

const setupData = async (req, res) => {
  try {
    const [avatars, battlePreferences, codingExperiences, languages] =
      await Promise.all([
        Avatar.find().lean(), //lean() katrj3 l'objet mongoose sous forme de json
        BattlePreference.find().lean(),
        CodingExperience.find().lean(),
        Language.find().lean(),
      ]);

    const responseData = {
      avatars,
      battlePreferences,
      codingExperiences,
      languages,
    };

    res.status(200).json(responseData);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export default setupData;
