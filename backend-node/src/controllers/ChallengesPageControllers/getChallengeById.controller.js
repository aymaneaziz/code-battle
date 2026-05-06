import Challenge from "../../models/GameplayModels/challenge.model.js";
import "../../models/GameplayModels/problem.model.js"; // Register schema for population

const getChallengeById = async (req, res) => {
  try {
    const { challengeId } = req.params;

    // Search by your custom challengeId
    const challenge = await Challenge.findOne({
      challengeId: challengeId,
    }).populate("problemId");

    if (!challenge) {
      return res.status(404).json({ message: "Challenge not found" });
    }

    res.status(200).json(challenge);
  } catch (error) {
    console.error("Error fetching specific challenge:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export default getChallengeById;
