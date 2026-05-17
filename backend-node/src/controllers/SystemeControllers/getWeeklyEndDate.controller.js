import System from "../../models/SystemModels/system.model.js";

export const getWeeklyEndDate = async (req, res) => {
  try {
    const weeklyEndDate = await System.findOne({ _id: "SYSTEM_CONFIG" }).select(
      "weeklyEndDate"
    );
    return res.status(200).json(weeklyEndDate);
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
};
