import System from "../../models/SystemModels/system.model.js";

export const getSeasonEndDate = async (req, res) => {
  try {
    const seasonEndDate = await System.findOne({ _id: "SYSTEM_CONFIG" }).select(
      "seasonEndDate"
    );
    return res.status(200).json(seasonEndDate);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
