import System from "../../models/SystemModels/system.model.js";

const getSystemInfo = async (req, res) => {
  try {
    const info = await System.findOne({ _id: "SYSTEM_CONFIG" });
    res.status(200).json(info);
  } catch (error) {
    res.status(500).json({
      message: "Erreur serveur lors de la récupération des informations",
      error: error.message,
    });
  }
};

export { getSystemInfo };
