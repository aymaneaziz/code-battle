// id         → Judge0 language id (sent to backend)
// name       → display label in the select
// label      → Monaco editor language identifier
// starterKey → key used in problem.starterCode / problem.runnerCode in the DB
export const SUPPORTED_LANGUAGES = [
  { id: 63, name: "JavaScript", label: "javascript", starterKey: "javascript" },
  { id: 71, name: "Python 3", label: "python", starterKey: "python" },
  { id: 54, name: "C++ (GCC 9.2)", label: "cpp", starterKey: "cpp" },
  { id: 62, name: "Java (OpenJDK 13)", label: "java", starterKey: "java" },
  { id: 94, name: "TypeScript", label: "typescript", starterKey: "typescript" },
  { id: 51, name: "C# (Mono)", label: "csharp", starterKey: "csharp" },
  { id: 95, name: "Go", label: "go", starterKey: "go" },
  { id: 92, name: "Rust", label: "rust", starterKey: "rust" },
  { id: 50, name: "C (GCC 9.2)", label: "c", starterKey: "c" },
  { id: 72, name: "Ruby", label: "ruby", starterKey: "ruby" },
  { id: 68, name: "PHP", label: "php", starterKey: "php" },
  { id: 83, name: "Swift", label: "swift", starterKey: "swift" },
  { id: 78, name: "Kotlin", label: "kotlin", starterKey: "kotlin" },
];
