import Challenge from "../../models/GameplayModels/challenge.model.js";

export const getRandomChallenge = async (req, res) => {
  try {
    const randomChallenge = await Challenge.aggregate([
      { $sample: { size: 1 } },
      { $project: { challengeId: 1, _id: 0 } },
    ]);

    if (!randomChallenge || randomChallenge.length === 0) {
      return res
        .status(404)
        .json({ message: "No challenges found in the database" });
    }

    // Sends back: { challengeId: "challenge_XXXX" }
    res.json({ challengeId: randomChallenge[0].challengeId });
  } catch (error) {
    console.error("Get Random Challenge Error:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};
