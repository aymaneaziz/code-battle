import Problem from "../../models/GameplayModels/problem.model.js";
import { seedData } from "../../config/seederEngine.js";

const problems = [
  {
    problemId: "prob_sorting_heap",
    title: "Sorting by heap",
    slug: "sorting-by-heap",
    description:
      "Given an array of integers, implement a heap sort algorithm to sort the array in ascending order.",
    difficulty: "HARD",
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
        input: { nums: [5, 1, 1, 2, 0, 0] },
        output: [0, 0, 1, 1, 2, 5],
        points: 20,
        isHidden: false,
      },
    ],
    starterCode: {
      python: "def heapSort(nums):\n    # Your code here\n    pass",
      javascript: "function heapSort(nums) {\n    // Your code here\n}",
    },
    constraints: {
      numsLength: { min: 1, max: 50000 },
      numsValue: { min: -50000, max: 50000 },
    },
  },
  {
    problemId: "prob_max_value",
    title: "Max value",
    slug: "max-value",
    description: "Find the maximum value in a given array of numbers.",
    difficulty: "EASY",
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
    ],
    starterCode: {
      python: "def findMaxValue(nums):\n    # Your code here\n    pass",
      javascript: "function findMaxValue(nums) {\n    // Your code here\n}",
    },
    constraints: {
      numsLength: { min: 1, max: 10000 },
    },
  },
  {
    problemId: "prob_tribonacci",
    title: "Tri-bonacci Sequence",
    slug: "tribonacci-sequence",
    description:
      "The Tribonacci sequence Tn is defined as follows: T0 = 0, T1 = 1, T2 = 1, and Tn+3 = Tn + Tn+1 + Tn+2 for n >= 0. Return the value of Tn.",
    difficulty: "MEDIUM",
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
        input: { n: 25 },
        output: 1389537,
        points: 15,
        isHidden: false,
      },
    ],
    starterCode: {
      python: "def tribonacci(n):\n    # Your code here\n    pass",
      javascript: "function tribonacci(n) {\n    // Your code here\n}",
    },
    constraints: {
      nValue: { min: 0, max: 37 },
    },
  },
  {
    problemId: "prob_valid_palindrome",
    title: "Valid Palindrome",
    slug: "valid-palindrome",
    description:
      "Given a string, return true if it is a palindrome, considering only alphanumeric characters and ignoring cases.",
    difficulty: "EASY",
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
      },
    ],
    starterCode: {
      python: "def isPalindrome(s):\n    pass",
      javascript: "function isPalindrome(s) {\n\n}",
    },
    constraints: { sLength: { min: 1, max: 200000 } },
  },
  {
    problemId: "prob_coin_change",
    title: "Coin Change",
    slug: "coin-change",
    description:
      "Return the fewest number of coins that you need to make up a specific amount. If that amount of money cannot be made up by any combination of the coins, return -1.",
    difficulty: "MEDIUM",
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
        input: { coins: [2], amount: 3 },
        output: -1,
        points: 20,
      },
    ],
    starterCode: {
      python: "def coinChange(coins, amount):\n    pass",
      javascript: "function coinChange(coins, amount) {\n\n}",
    },
    constraints: {
      coinsLength: { min: 1, max: 12 },
      amount: { min: 0, max: 10000 },
    },
  },
  {
    problemId: "prob_n_queens",
    title: "N-Queens Puzzle",
    slug: "n-queens",
    description:
      "The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other. Return the number of distinct solutions.",
    difficulty: "EXTREME",
    timeLimitMs: 3000,
    tags: ["backtracking", "recursion"],
    returnType: "number",
    functionName: "totalNQueens",
    examples: [{ input: { n: 4 }, output: 2 }],
    testCases: [{ testCaseId: "tc1", input: { n: 8 }, output: 92, points: 50 }],
    starterCode: {
      python: "def totalNQueens(n):\n    pass",
      javascript: "function totalNQueens(n) {\n\n}",
    },
    constraints: { n: { min: 1, max: 9 } },
  },
];

export const seedProblems = () => seedData(Problem, problems, "problemId");
