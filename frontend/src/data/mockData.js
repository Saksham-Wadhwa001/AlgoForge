export const PROFILE = {
  handles: {
    codeforces: "tourist_fan",
    leetcode: "algo_forge",
    atcoder: "forge_ac",
  },
  platforms: {
    codeforces: { currentRating: 1487, maxRating: 1602, solved: 842, rank: "Specialist" },
    leetcode: { currentRating: 1864, maxRating: 1921, solved: 513, rank: "Knight" },
    atcoder: { currentRating: 1123, maxRating: 1240, solved: 287, rank: "Cyan" },
  },
  totalSolved: 1642,
  peakRating: 1921,
};

export const TAG_STATS = [
  { tag: "bitmasking", attempted: 5, solved: 1, successRate: 20.0 },
  { tag: "graphs", attempted: 11, solved: 4, successRate: 36.4 },
  { tag: "dp", attempted: 14, solved: 6, successRate: 42.9 },
  { tag: "trees", attempted: 7, solved: 3, successRate: 42.9 },
  { tag: "strings", attempted: 2, solved: 1, successRate: 50.0 },
  { tag: "math", attempted: 16, solved: 12, successRate: 75.0 },
  { tag: "two pointers", attempted: 8, solved: 6, successRate: 75.0 },
];

export const RECOMMENDATIONS = [
  {
    id: 1,
    name: "Orray (Bitmask Greedy)",
    platform: "codeforces",
    rating: 1500,
    solveCount: 18420,
    tags: ["bitmasking"],
    url: "https://codeforces.com/problemset/problem/242/E",
  },
  {
    id: 2,
    name: "Maximum Length of a Concatenated String",
    platform: "leetcode",
    rating: 1550,
    solveCount: 12330,
    tags: ["bitmasking"],
    url: "https://leetcode.com/problems/maximum-length-of-a-concatenated-string-with-unique-characters/",
  },
  {
    id: 3,
    name: "Teleporter (Bitmask DP)",
    platform: "atcoder",
    rating: 1520,
    solveCount: 9870,
    tags: ["bitmasking"],
    url: "https://atcoder.jp/contests/abc",
  },
];

export const MIN_ATTEMPTS_THRESHOLD = 3;
