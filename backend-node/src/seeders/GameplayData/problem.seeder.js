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
];

export const seedProblems = () => seedData(Problem, problems, "problemId");
