/**
 * SUPPORTED_LANGUAGES
 * ───────────────────
 * id        → Judge0 language id (sent to backend)
 * name      → display label in the select
 * label     → Monaco editor language identifier
 * starterKey → key used in problem.starterCode / problem.runnerCode in the DB
 */
export const SUPPORTED_LANGUAGES = [
  { id: 63, name: "JavaScript", label: "javascript", starterKey: "javascript" },
  { id: 71, name: "Python 3", label: "python", starterKey: "python" },
  // Add more here and add matching starterCode + runnerCode keys to the seeder
  { id: 54, name: "C++", label: "cpp", starterKey: "cpp" },
  { id: 62, name: "Java", label: "java", starterKey: "java" },
];
