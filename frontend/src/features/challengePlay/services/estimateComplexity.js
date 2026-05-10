// ─── Complexity estimator ─────────────────────────────────────────────────────
/**
 * Multi-signal static analysis.
 *
 * Priority order (highest wins):
 *  1. Explicit nested loops in written code      → O(n²) / O(n³+)
 *  2. Sorting builtins + a loop                  → O(n log n)
 *  3. Sorting builtins alone                     → O(n log n)
 *  4. Binary-search pattern (halving)            → O(log n)
 *  5. Single loop OR linear builtins             → O(n)
 *  6. Nothing iterative found                    → O(1)
 *
 * "Linear builtins": functions that are O(n) even with no visible loop —
 *  max(), min(), sum(), len(), count(), find(), includes(), indexOf(),
 *  filter(), map(), reduce(), forEach(), every(), some(), join(), split(),
 *  reverse(), Array.from(), list(), set(), dict(), str(), int() on iterables.
 */
export const estimateComplexity = (code) => {
  if (!code || !code.trim()) return null;

  const full = code;

  // ── Patterns ──────────────────────────────────────────────────────────────

  // Explicit loop keywords (written by the user)
  const LOOP_RE = /\b(for|while)\b/g;

  // Linear builtins (O(n) internally even with no written loop)
  const LINEAR_BUILTIN_RE =
    /\b(max|min|sum|len|count|find|includes|indexOf|lastIndexOf|filter|map|flatMap|reduce|reduceRight|forEach|every|some|join|split|reverse|Array\.from|list|set|dict|sorted|enumerate|zip|any|all)\s*\(/g;

  // Sorting (O(n log n))
  const SORT_RE =
    /\b(sorted|\.sort|mergeSort|heapSort|quickSort|sort_values|sort_index)\s*[(\[.]/g;

  // Binary-search / halving (O(log n))
  const LOG_RE =
    /\/\s*2\b|>>\s*1|Math\.log|bisect|binary.?search|\bmid\b.*=.*\b(lo|hi|left|right|start|end|low|high)\b/gi;

  // ── Count written loops per indentation level ─────────────────────────────
  // Strategy: track the indent depth of every loop line; maximal nesting = depth
  const lines = full.split("\n");
  let maxLoopDepth = 0;

  // Stack of indent levels where loops were found
  const loopIndentStack = [];

  for (const line of lines) {
    if (!line.trim()) continue;
    const indent = line.search(/\S/); // spaces before first char
    const hasLoop = LOOP_RE.test(line);
    LOOP_RE.lastIndex = 0; // reset stateful regex

    // Pop stack entries that are at same/deeper indent (we exited those blocks)
    while (
      loopIndentStack.length &&
      loopIndentStack[loopIndentStack.length - 1] >= indent
    ) {
      loopIndentStack.pop();
    }

    if (hasLoop) {
      loopIndentStack.push(indent);
      maxLoopDepth = Math.max(maxLoopDepth, loopIndentStack.length);
    }
  }

  // ── Check other signals ───────────────────────────────────────────────────
  const hasLinearBuiltin = LINEAR_BUILTIN_RE.test(full);
  const hasSorting = SORT_RE.test(full);
  const hasLogPattern = LOG_RE.test(full);

  // ── Classify ──────────────────────────────────────────────────────────────

  // Written nested loops dominate
  if (maxLoopDepth >= 3) return "O(n³+)";
  if (maxLoopDepth === 2) return "O(n²)";

  // One written loop + sorting → n log n
  if (maxLoopDepth === 1 && hasSorting) return "O(n log n)";

  // One written loop (no sorting) → O(n)
  if (maxLoopDepth === 1) return "O(n)";

  // No written loops — check builtins
  if (hasSorting) return "O(n log n)";
  if (hasLogPattern && !hasLinearBuiltin) return "O(log n)";
  if (hasLinearBuiltin) return "O(n)";

  // Nothing iterative found
  return "O(1)";
};
