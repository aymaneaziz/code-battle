import Problem from "../../models/Gameplay/problem.model.js";
import { seedData } from "../seederEngine.js";

const problems = [
  {
    problemId: "problem1",
    title: "Two Sum",
    slug: "two-sum",
    description:
      "Given an array of integers, return indices of the two numbers such that they add up to a specific target.",
    difficulty: "EASY",
    timeLimitMs: 1000,
    tags: ["array", "hash-table"],
    returnType: "number[]",
    functionName: "twoSum",
    examples: [
      {
        input: { nums: [2, 7, 11, 15], target: 9 },
        output: [0, 1],
        explanation: "nums[0] + nums[1] = 9",
      },
    ],
    testCases: [
      {
        testCasesId: "tc1",
        input: { nums: [1, 2, 3], target: 5 },
        output: [1, 2],
        points: 10,
        isHidden: false,
      },
      {
        testCasesId: "tc2",
        input: { nums: [3, 3], target: 6 },
        output: [0, 1],
        points: 10,
        isHidden: false,
      },
    ],
    starterCode: {
      python: "def twoSum(nums, target):\n    # Your code here\n    pass",
      javascript: "function twoSum(nums, target) {\n    // Your code here\n}",
    },
    constraints: {
      numsLength: { min: 2, max: 10000 },
      numsValue: { min: -1000000000, max: 1000000000 },
      target: { min: -1000000000, max: 1000000000 },
    },
    createdAt: "2024-01-01T12:00:00Z",
    updatedAt: "2024-01-01T12:00:00Z",
  },
  {
    problemId: "problem2",
    title: "Maximum Subarray",
    slug: "maximum-subarray",
    description:
      "Given an integer array, find the contiguous subarray (containing at least one number) which has the largest sum and return its sum.",
    difficulty: "MEDIUM",
    timeLimitMs: 1000,
    tags: ["array", "dynamic-programming", "kadane"],
    returnType: "number",
    functionName: "maxSubArray",
    examples: [
      {
        input: { nums: [-2, 1, -3, 4, -1, 2, 1, -5, 4] },
        output: 6,
        explanation: "Subarray [4,-1,2,1] has max sum 6",
      },
    ],
    testCases: [
      {
        testCasesId: "tc1",
        input: { nums: [1] },
        output: 1,
        points: 10,
        isHidden: false,
      },
      {
        testCasesId: "tc2",
        input: { nums: [-1, -2, -3] },
        output: -1,
        points: 15,
        isHidden: false,
      },
    ],
    starterCode: {
      python: "def maxSubArray(nums):\n    # Your code here\n    pass",
      javascript: "function maxSubArray(nums) {\n    // Your code here\n}",
    },
    constraints: {
      numsLength: { min: 1, max: 100000 },
      numsValue: { min: -1000000000, max: 1000000000 },
    },
    createdAt: "2026-05-04T00:00:00Z",
    updatedAt: "2026-05-04T00:00:00Z",
  },
];

export const seedProblems = () => seedData(Problem, problems, "problemId");
