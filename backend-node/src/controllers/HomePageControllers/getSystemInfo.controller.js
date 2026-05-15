import System from "../../models/SystemModels/system.model.js";

const getSystemInfo = async (req, res) => {
  try {
    const info = await System.findOne({ _id: "SYSTEM_CONFIG" });
    res.status(200).json(info);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};

export { getSystemInfo };
