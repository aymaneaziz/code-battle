import Problem from "../../models/GameplayModels/problem.model.js";

export async function getMatchProblem() {
  try {
    const count = await Problem.countDocuments();
    if (count === 0) {
      console.warn("[Match] No problems found in DB.");
      return;
    }

    const randomIndex = Math.floor(Math.random() * count);
    const problem = await Problem.findOne()
      .skip(randomIndex)
      .select("-runnerCode") // NEVER send runner code to client
      .lean();

    if (!problem) return;

    return problem;
  } catch (err) {
    console.error("[Match] Failed to send problem:", err);
  }
}
