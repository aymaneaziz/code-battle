import Problem from "../../models/GameplayModels/problem.model.js";
import { seedData } from "../../config/seederEngine.js";

/**
 * isHidden: false  → shown in the Test Cases panel (user can see input + expected)
 * isHidden: true   → only run on Submit, never shown to the user
 *
 * Each problem has 3 visible cases + 2 hidden cases for a fair grading spread.
 */

const problems = [
  // ─── Easy ──────────────────────────────────────────────────────────────────
  {
    problemId: "prob_max_value",
    title: "Max value",
    slug: "max-value",
    description: "Find the maximum value in a given array of numbers.",
    difficulty: "Easy",
    timeLimitMs: 1000,
    tags: ["array", "math"],
    returnType: "number",
    functionName: "findMaxValue",
    examples: [
      {
        input: { nums: [1, 5, 3, 9, 2] },
        output: 9,
        explanation: "9 is the largest number in the array.",
      },
    ],
    testCases: [
      {
        testCaseId: "tc1",
        input: { nums: [-10, -5, -2] },
        output: -2,
        points: 10,
        isHidden: false,
      },
      {
        testCaseId: "tc2",
        input: { nums: [3, 1, 4, 1, 5, 9] },
        output: 9,
        points: 10,
        isHidden: false,
      },
      {
        testCaseId: "tc3",
        input: { nums: [42] },
        output: 42,
        points: 10,
        isHidden: false,
      },
      {
        testCaseId: "tc4",
        input: { nums: [0, 0, 0] },
        output: 0,
        points: 15,
        isHidden: true,
      },
      {
        testCaseId: "tc5",
        input: { nums: [-100, -200, -1] },
        output: -1,
        points: 15,
        isHidden: true,
      },
    ],
    starterCode: {
      python: "def findMaxValue(nums):\n    # Your code here\n    pass",
      javascript: "function findMaxValue(nums) {\n    // Your code here\n}",
    },
    runnerCode: {
      python: `
import json as _json
_nums = _json.loads(input())
print(findMaxValue(_nums))`,
      javascript: `
const _lines = require("fs").readFileSync("/dev/stdin","utf8").trim().split("\\n");
const _nums = JSON.parse(_lines[0]);
console.log(findMaxValue(_nums));`,
    },
    constraints: { numsLength: { min: 1, max: 10000 } },
  },

  // ─── Easy ──────────────────────────────────────────────────────────────────
  {
    problemId: "prob_valid_palindrome",
    title: "Valid Palindrome",
    slug: "valid-palindrome",
    description:
      "Given a string, return true if it is a palindrome, considering only alphanumeric characters and ignoring cases.",
    difficulty: "Easy",
    timeLimitMs: 1000,
    tags: ["string", "two-pointers"],
    returnType: "boolean",
    functionName: "isPalindrome",
    examples: [
      { input: { s: "A man, a plan, a canal: Panama" }, output: true },
    ],
    testCases: [
      {
        testCaseId: "tc1",
        input: { s: "race a car" },
        output: false,
        points: 10,
        isHidden: false,
      },
      {
        testCaseId: "tc2",
        input: { s: "A man, a plan, a canal: Panama" },
        output: true,
        points: 10,
        isHidden: false,
      },
      {
        testCaseId: "tc3",
        input: { s: " " },
        output: true,
        points: 10,
        isHidden: false,
      },
      {
        testCaseId: "tc4",
        input: { s: "Was it a car or a cat I saw?" },
        output: true,
        points: 15,
        isHidden: true,
      },
      {
        testCaseId: "tc5",
        input: { s: "hello" },
        output: false,
        points: 15,
        isHidden: true,
      },
    ],
    starterCode: {
      python: "def isPalindrome(s):\n    # Your code here\n    pass",
      javascript: "function isPalindrome(s) {\n    // Your code here\n}",
    },
    runnerCode: {
      python: `
_s = input()
print(isPalindrome(_s))`,
      javascript: `
const _lines = require("fs").readFileSync("/dev/stdin","utf8").trim().split("\\n");
const _s = _lines[0];
console.log(isPalindrome(_s));`,
    },
    constraints: { sLength: { min: 1, max: 200000 } },
  },

  // ─── Medium ────────────────────────────────────────────────────────────────
  {
    problemId: "prob_tribonacci",
    title: "Tri-bonacci Sequence",
    slug: "tribonacci-sequence",
    description:
      "The Tribonacci sequence Tn is defined as follows: T0 = 0, T1 = 1, T2 = 1, and Tn+3 = Tn + Tn+1 + Tn+2 for n >= 0. Return the value of Tn.",
    difficulty: "Medium",
    timeLimitMs: 1000,
    tags: ["math", "dynamic-programming"],
    returnType: "number",
    functionName: "tribonacci",
    examples: [
      {
        input: { n: 4 },
        output: 4,
        explanation: "T_3 = 0 + 1 + 1 = 2\nT_4 = 1 + 1 + 2 = 4",
      },
    ],
    testCases: [
      {
        testCaseId: "tc1",
        input: { n: 4 },
        output: 4,
        points: 10,
        isHidden: false,
      },
      {
        testCaseId: "tc2",
        input: { n: 0 },
        output: 0,
        points: 10,
        isHidden: false,
      },
      {
        testCaseId: "tc3",
        input: { n: 1 },
        output: 1,
        points: 10,
        isHidden: false,
      },
      {
        testCaseId: "tc4",
        input: { n: 25 },
        output: 1389537,
        points: 15,
        isHidden: true,
      },
      {
        testCaseId: "tc5",
        input: { n: 37 },
        output: 2082876103,
        points: 15,
        isHidden: true,
      },
    ],
    starterCode: {
      python: "def tribonacci(n):\n    # Your code here\n    pass",
      javascript: "function tribonacci(n) {\n    // Your code here\n}",
    },
    runnerCode: {
      python: `
_n = int(input())
print(tribonacci(_n))`,
      javascript: `
const _lines = require("fs").readFileSync("/dev/stdin","utf8").trim().split("\\n");
const _n = parseInt(_lines[0]);
console.log(tribonacci(_n));`,
    },
    constraints: { nValue: { min: 0, max: 37 } },
  },

  // ─── Medium ────────────────────────────────────────────────────────────────
  {
    problemId: "prob_coin_change",
    title: "Coin Change",
    slug: "coin-change",
    description:
      "Return the fewest number of coins that you need to make up a specific amount. If that amount of money cannot be made up by any combination of the coins, return -1.",
    difficulty: "Medium",
    timeLimitMs: 2000,
    tags: ["dynamic-programming", "array"],
    returnType: "number",
    functionName: "coinChange",
    examples: [
      {
        input: { coins: [1, 2, 5], amount: 11 },
        output: 3,
        explanation: "11 = 5 + 5 + 1",
      },
    ],
    testCases: [
      {
        testCaseId: "tc1",
        input: { coins: [1, 2, 5], amount: 11 },
        output: 3,
        points: 10,
        isHidden: false,
      },
      {
        testCaseId: "tc2",
        input: { coins: [2], amount: 3 },
        output: -1,
        points: 10,
        isHidden: false,
      },
      {
        testCaseId: "tc3",
        input: { coins: [1], amount: 0 },
        output: 0,
        points: 10,
        isHidden: false,
      },
      {
        testCaseId: "tc4",
        input: { coins: [186, 419, 83, 408], amount: 6249 },
        output: 20,
        points: 15,
        isHidden: true,
      },
      {
        testCaseId: "tc5",
        input: { coins: [3, 7, 405, 436], amount: 8839 },
        output: 25,
        points: 15,
        isHidden: true,
      },
    ],
    starterCode: {
      python: "def coinChange(coins, amount):\n    # Your code here\n    pass",
      javascript:
        "function coinChange(coins, amount) {\n    // Your code here\n}",
    },
    runnerCode: {
      python: `
import json as _json
_coins  = _json.loads(input())
_amount = int(input())
print(coinChange(_coins, _amount))`,
      javascript: `
const _lines = require("fs").readFileSync("/dev/stdin","utf8").trim().split("\\n");
const _coins  = JSON.parse(_lines[0]);
const _amount = parseInt(_lines[1]);
console.log(coinChange(_coins, _amount));`,
    },
    constraints: {
      coinsLength: { min: 1, max: 12 },
      amount: { min: 0, max: 10000 },
    },
  },

  // ─── Hard ──────────────────────────────────────────────────────────────────
  {
    problemId: "prob_sorting_heap",
    title: "Sorting by heap",
    slug: "sorting-by-heap",
    description:
      "Given an array of integers, implement a heap sort algorithm to sort the array in ascending order.",
    difficulty: "Hard",
    timeLimitMs: 2000,
    tags: ["array", "sorting", "heap"],
    returnType: "number[]",
    functionName: "heapSort",
    examples: [
      {
        input: { nums: [5, 2, 3, 1] },
        output: [1, 2, 3, 5],
        explanation: "The array is sorted in ascending order.",
      },
    ],
    testCases: [
      {
        testCaseId: "tc1",
        input: { nums: [5, 2, 3, 1] },
        output: [1, 2, 3, 5],
        points: 10,
        isHidden: false,
      },
      {
        testCaseId: "tc2",
        input: { nums: [5, 1, 1, 2, 0, 0] },
        output: [0, 0, 1, 1, 2, 5],
        points: 10,
        isHidden: false,
      },
      {
        testCaseId: "tc3",
        input: { nums: [-3, 0, 7, -1, 2] },
        output: [-3, -1, 0, 2, 7],
        points: 10,
        isHidden: false,
      },
      {
        testCaseId: "tc4",
        input: { nums: [1] },
        output: [1],
        points: 15,
        isHidden: true,
      },
      {
        testCaseId: "tc5",
        input: { nums: [9, 8, 7, 6, 5, 4, 3, 2, 1] },
        output: [1, 2, 3, 4, 5, 6, 7, 8, 9],
        points: 15,
        isHidden: true,
      },
    ],
    starterCode: {
      python: "def heapSort(nums):\n    # Your code here\n    pass",
      javascript: "function heapSort(nums) {\n    // Your code here\n}",
    },
    runnerCode: {
      python: `
import json as _json
_nums = _json.loads(input())
print(_json.dumps(heapSort(_nums), separators=(',', ':')))`,
      javascript: `
const _lines = require("fs").readFileSync("/dev/stdin","utf8").trim().split("\\n");
const _nums = JSON.parse(_lines[0]);
console.log(JSON.stringify(heapSort(_nums)));`,
    },
    constraints: {
      numsLength: { min: 1, max: 50000 },
      numsValue: { min: -50000, max: 50000 },
    },
  },

  // ─── Extreme ───────────────────────────────────────────────────────────────
  {
    problemId: "prob_n_queens",
    title: "N-Queens Puzzle",
    slug: "n-queens",
    description:
      "The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other. Return the number of distinct solutions.",
    difficulty: "Extreme",
    timeLimitMs: 3000,
    tags: ["backtracking", "recursion"],
    returnType: "number",
    functionName: "totalNQueens",
    examples: [{ input: { n: 4 }, output: 2 }],
    testCases: [
      {
        testCaseId: "tc1",
        input: { n: 1 },
        output: 1,
        points: 10,
        isHidden: false,
      },
      {
        testCaseId: "tc2",
        input: { n: 4 },
        output: 2,
        points: 10,
        isHidden: false,
      },
      {
        testCaseId: "tc3",
        input: { n: 5 },
        output: 10,
        points: 10,
        isHidden: false,
      },
      {
        testCaseId: "tc4",
        input: { n: 6 },
        output: 4,
        points: 20,
        isHidden: true,
      },
      {
        testCaseId: "tc5",
        input: { n: 8 },
        output: 92,
        points: 20,
        isHidden: true,
      },
    ],
    starterCode: {
      python: "def totalNQueens(n):\n    # Your code here\n    pass",
      javascript: "function totalNQueens(n) {\n    // Your code here\n}",
    },
    runnerCode: {
      python: `
_n = int(input())
print(totalNQueens(_n))`,
      javascript: `
const _lines = require("fs").readFileSync("/dev/stdin","utf8").trim().split("\\n");
const _n = parseInt(_lines[0]);
console.log(totalNQueens(_n));`,
    },
    constraints: { n: { min: 1, max: 9 } },
  },
];

export const seedProblems = () => seedData(Problem, problems, "problemId");
