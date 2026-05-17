import Problem from "../../models/GameplayModels/problem.model.js";
import { seedData } from "../../config/seederEngine.js";

const problems = [
  // ─── Easy ──────────────────────────────────────────────────────────────────
  {
    problemId: "prob_max_value",
    title: "Max value",
    slug: "max-value",
    description: "Find the maximum value in a given array of numbers.",
    difficulty: "Easy",
    timeLimitMs: 1000,
    timeArenaS: 900,
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
    timeArenaS: 900,
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
    timeArenaS: 1800,
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
    timeArenaS: 1800,
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
    timeArenaS: 2700,
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

  // ─── Extreme ──────────────────────────────────────────────────────────────
  {
    problemId: "prob_n_queens",
    title: "N-Queens Puzzle",
    slug: "n-queens",
    description:
      "The n-queens puzzle is the problem of placing n queens on an n x n chessboard such that no two queens attack each other. Return the number of distinct solutions.",
    difficulty: "Extreme",
    timeLimitMs: 3000,
    timeArenaS: 3600,
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
  // ─── Easy ──────────────────────────────────────────────────────────────
  {
    problemId: "prob_two_sum",
    title: "Two Sum",
    slug: "two-sum",
    description:
      "Given an array of integers nums and an integer target, return the indices of the two numbers that add up to target. You may assume that each input has exactly one solution, and you may not use the same element twice. Return the indices in ascending order.",
    difficulty: "Easy",
    timeLimitMs: 1000,
    timeArenaS: 900,
    tags: ["array", "hash-map"],
    returnType: "number[]",
    functionName: "twoSum",
    examples: [
      {
        input: { nums: [2, 7, 11, 15], target: 9 },
        output: [0, 1],
        explanation: "nums[0] + nums[1] = 2 + 7 = 9.",
      },
      {
        input: { nums: [3, 2, 4], target: 6 },
        output: [1, 2],
        explanation: "nums[1] + nums[2] = 2 + 4 = 6.",
      },
    ],
    testCases: [
      {
        testCaseId: "tc1",
        input: { nums: [2, 7, 11, 15], target: 9 },
        output: [0, 1],
        points: 10,
        isHidden: false,
      },
      {
        testCaseId: "tc2",
        input: { nums: [3, 2, 4], target: 6 },
        output: [1, 2],
        points: 10,
        isHidden: false,
      },
      {
        testCaseId: "tc3",
        input: { nums: [3, 3], target: 6 },
        output: [0, 1],
        points: 10,
        isHidden: false,
      },
      {
        testCaseId: "tc4",
        input: { nums: [1, 4, 8, 7, 3, 15], target: 11 },
        output: [1, 4],
        points: 15,
        isHidden: true,
      },
      {
        testCaseId: "tc5",
        input: { nums: [0, 4, 3, 0], target: 0 },
        output: [0, 3],
        points: 15,
        isHidden: true,
      },
    ],
    starterCode: {
      cpp: "vector<int> twoSum(vector<int>& nums, int target) {\n    // Your code here\n}",
      python: "def twoSum(nums, target):\n    # Your code here\n    pass",
      java: "public int[] twoSum(int[] nums, int target) {\n    // Your code here\n}",
      javascript: "function twoSum(nums, target) {\n    // Your code here\n}",
    },
    runnerCode: {
      cpp: `
#include <bits/stdc++.h>
using namespace std;
// SOLUTION_PLACEHOLDER
int main() {
    string line; getline(cin, line);
    // parse nums
    vector<int> nums;
    string numsStr = line.substr(1, line.find(']') - 1);
    stringstream ss(numsStr);
    string tok;
    while (getline(ss, tok, ',')) nums.push_back(stoi(tok));
    getline(cin, line);
    int target = stoi(line);
    auto res = twoSum(nums, target);
    cout << "[" << res[0] << "," << res[1] << "]" << endl;
}`,
      python: `
import json as _j, sys as _s
_d = [l.strip() for l in _s.stdin.read().strip().split('\\n')]
_nums = _j.loads(_d[0]); _target = int(_d[1])
_r = twoSum(_nums, _target)
print(_j.dumps(_r))`,
      java: `
import java.util.*;
public class Main {
    // SOLUTION_PLACEHOLDER
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String numsLine = sc.nextLine().trim();
        numsLine = numsLine.substring(1, numsLine.length()-1);
        String[] parts = numsLine.split(",");
        int[] nums = new int[parts.length];
        for(int i=0;i<parts.length;i++) nums[i]=Integer.parseInt(parts[i].trim());
        int target = Integer.parseInt(sc.nextLine().trim());
        Main m = new Main();
        int[] res = m.twoSum(nums, target);
        System.out.println("["+res[0]+","+res[1]+"]");
    }
}`,
      javascript: `
const _lines = require("fs").readFileSync("/dev/stdin","utf8").trim().split("\\n");
const _nums = JSON.parse(_lines[0]);
const _target = Number(_lines[1]);
const _r = twoSum(_nums, _target);
console.log(JSON.stringify(_r));`,
    },
    constraints: {
      numsLength: { min: 2, max: 10000 },
      target: { min: -1e9, max: 1e9 },
    },
  },
  // ─── Medium ──────────────────────────────────────────────────────────────
  {
    problemId: "prob_longest_substring",
    title: "Longest Substring Without Repeating Characters",
    slug: "longest-substring-no-repeat",
    description:
      "Given a string s, find the length of the longest substring without repeating characters.",
    difficulty: "Medium",
    timeLimitMs: 1500,
    timeArenaS: 1800,
    tags: ["string", "sliding-window", "hash-map"],
    returnType: "number",
    functionName: "lengthOfLongestSubstring",
    examples: [
      {
        input: { s: "abcabcbb" },
        output: 3,
        explanation: "The answer is 'abc', with the length of 3.",
      },
      {
        input: { s: "bbbbb" },
        output: 1,
        explanation: "The answer is 'b', with the length of 1.",
      },
    ],
    testCases: [
      {
        testCaseId: "tc1",
        input: { s: "abcabcbb" },
        output: 3,
        points: 10,
        isHidden: false,
      },
      {
        testCaseId: "tc2",
        input: { s: "bbbbb" },
        output: 1,
        points: 10,
        isHidden: false,
      },
      {
        testCaseId: "tc3",
        input: { s: "pwwkew" },
        output: 3,
        points: 10,
        isHidden: false,
      },
      {
        testCaseId: "tc4",
        input: { s: "" },
        output: 0,
        points: 15,
        isHidden: true,
      },
      {
        testCaseId: "tc5",
        input: { s: "abrkaabcdefghijklmnopqrstuvwxyz" },
        output: 26,
        points: 15,
        isHidden: true,
      },
    ],
    starterCode: {
      cpp: "int lengthOfLongestSubstring(string s) {\n    // Your code here\n}",
      python:
        "def lengthOfLongestSubstring(s):\n    # Your code here\n    pass",
      java: "public int lengthOfLongestSubstring(String s) {\n    // Your code here\n}",
      javascript:
        "function lengthOfLongestSubstring(s) {\n    // Your code here\n}",
    },
    runnerCode: {
      cpp: `
#include <bits/stdc++.h>
using namespace std;
// SOLUTION_PLACEHOLDER
int main() {
    string s; getline(cin, s);
    if (s.size()>=2 && s.front()=='"' && s.back()=='"') s=s.substr(1,s.size()-2);
    cout << lengthOfLongestSubstring(s) << endl;
}`,
      python: `
import json as _j, sys as _s
_val = _j.loads(_s.stdin.read().strip())
print(lengthOfLongestSubstring(_val))`,
      java: `
import java.util.*;
public class Main {
    // SOLUTION_PLACEHOLDER
    public static void main(String[] args) {
        Scanner sc = new Scanner(System.in);
        String s = sc.nextLine().trim();
        if (s.startsWith("\\"") && s.endsWith("\\"")) s = s.substring(1, s.length()-1);
        System.out.println(new Main().lengthOfLongestSubstring(s));
    }
}`,
      javascript: `
const _lines = require("fs").readFileSync("/dev/stdin","utf8").trim().split("\\n");
const _s = JSON.parse(_lines[0]);
console.log(lengthOfLongestSubstring(_s));`,
    },
    constraints: { sLength: { min: 0, max: 50000 } },
  },
  // ─── Medium ──────────────────────────────────────────────────────────────
  {
    problemId: "prob_merge_intervals",
    title: "Merge Intervals",
    slug: "merge-intervals",
    description:
      "Given an array of intervals where intervals[i] = [start, end], merge all overlapping intervals and return an array of the non-overlapping intervals that cover all the intervals in the input.",
    difficulty: "Medium",
    timeArenaS: 1800,
    timeLimitMs: 1500,
    tags: ["array", "sorting", "intervals"],
    returnType: "number[][]",
    functionName: "merge",
    examples: [
      {
        input: {
          intervals: [
            [1, 3],
            [2, 6],
            [8, 10],
            [15, 18],
          ],
        },
        output: [
          [1, 6],
          [8, 10],
          [15, 18],
        ],
        explanation: "[1,3] and [2,6] overlap → merged to [1,6].",
      },
      {
        input: {
          intervals: [
            [1, 4],
            [4, 5],
          ],
        },
        output: [[1, 5]],
        explanation: "[1,4] and [4,5] are considered overlapping.",
      },
    ],
    testCases: [
      {
        testCaseId: "tc1",
        input: {
          intervals: [
            [1, 3],
            [2, 6],
            [8, 10],
            [15, 18],
          ],
        },
        output: [
          [1, 6],
          [8, 10],
          [15, 18],
        ],
        points: 10,
        isHidden: false,
      },
      {
        testCaseId: "tc2",
        input: {
          intervals: [
            [1, 4],
            [4, 5],
          ],
        },
        output: [[1, 5]],
        points: 10,
        isHidden: false,
      },
      {
        testCaseId: "tc3",
        input: { intervals: [[1, 4]] },
        output: [[1, 4]],
        points: 10,
        isHidden: false,
      },
      {
        testCaseId: "tc4",
        input: {
          intervals: [
            [1, 4],
            [0, 2],
            [3, 5],
          ],
        },
        output: [[0, 5]],
        points: 15,
        isHidden: true,
      },
      {
        testCaseId: "tc5",
        input: {
          intervals: [
            [2, 3],
            [4, 5],
            [6, 7],
            [8, 9],
            [1, 10],
          ],
        },
        output: [[1, 10]],
        points: 15,
        isHidden: true,
      },
    ],
    starterCode: {
      cpp: `#include <bits/stdc++.h>
using namespace std; 
vector<vector<int>> merge(vector<vector<int>>& intervals) {
    // Your code here
}`,
      python: `def merge(intervals):
    # Your code here
    pass`,
      java: `import java.util.*; public int[][] merge(int[][] intervals) {
    // Your code here
}`,
      javascript: `function merge(intervals) {
    // Your code here
}`,
    },
    runnerCode: {
      cpp: `

// SOLUTION_PLACEHOLDER
int main() {
    string line; getline(cin, line);
    // simple nested array parser
    vector<vector<int>> intervals;
    int i=0,n=line.size();
    while(i<n){
        if(line[i]=='[' && i+1<n && line[i+1]!='['){i++;continue;}
        if(line[i]=='['){
            i++;
            vector<int> pair;
            while(line[i]!=']'){
                if(isdigit(line[i])||line[i]=='-'){
                    int sign=1;
                    if(line[i]=='-'){sign=-1;i++;}
                    int num=0;
                    while(i<n&&isdigit(line[i])) num=num*10+(line[i++]-'0');
                    pair.push_back(sign*num);
                } else i++;
            }
            if(!pair.empty()) intervals.push_back(pair);
        }
        i++;
    }
    auto res = merge(intervals);
    cout<<"[";
    for(int k=0;k<res.size();k++){
        cout<<"["<<res[k][0]<<","<<res[k][1]<<"]";
        if(k<res.size()-1) cout<<",";
    }
    cout<<"]"<<endl;
}`,
      python: `
import json as _j, sys as _s
_intervals = _j.loads(_s.stdin.read().strip())
_r = merge(_intervals)
print(_j.dumps(_r))`,
      java: `

public class Main {
    // SOLUTION_PLACEHOLDER
    public static void main(String[] args) throws Exception {
        Scanner sc = new Scanner(System.in);
        String line = sc.nextLine().trim();
        // parse [[a,b],[c,d]...]
        line = line.substring(1, line.length()-1);
        String[] pairs = line.split("\\\\],\\\\[");
        int[][] intervals = new int[pairs.length][2];
        for(int i=0;i<pairs.length;i++){
            String p = pairs[i].replaceAll("[\\\\[\\\\]]","");
            String[] ab = p.split(",");
            intervals[i][0]=Integer.parseInt(ab[0].trim());
            intervals[i][1]=Integer.parseInt(ab[1].trim());
        }
        int[][] res = new Main().merge(intervals);
        StringBuilder sb = new StringBuilder("[");
        for(int i=0;i<res.length;i++){
            sb.append("[").append(res[i][0]).append(",").append(res[i][1]).append("]");
            if(i<res.length-1) sb.append(",");
        }
        sb.append("]");
        System.out.println(sb);
    }
}`,
      javascript: `
const _lines = require("fs").readFileSync("/dev/stdin","utf8").trim().split("\\n");
const _intervals = JSON.parse(_lines[0]);
console.log(JSON.stringify(merge(_intervals)));`,
    },
    constraints: {
      intervalsLength: { min: 1, max: 10000 },
      values: { min: 0, max: 10000 },
    },
  },
];

export const seedProblems = () => seedData(Problem, problems, "problemId");
