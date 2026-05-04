import systemInfo from "../../models/System/systemInfo.model.js";

const getSystemInfo = async (req, res) => {
  try {
    const info = await systemInfo.findOne({ _id: "SYSTEM_CONFIG" });
    res.status(200).json(info);
    console.log("Les données de /api/home/data on été envoyées avec succés");
  } catch (error) {
    console.error("Error in getSystemInfo:", error);
    res.status(500).json({
      message: "Erreur serveur lors de la récupération des informations",
      error: error.message,
    });
  }
};

export { getSystemInfo };
