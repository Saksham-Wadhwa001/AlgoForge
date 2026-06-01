// ── AlgoForge Mock Data ──
// Used for frontend development before backend integration.

export const FAKE_USER = {
  handles: {
    codeforces: "tourist",
    leetcode: "neal_wu",
    atcoder: "tourist",
  },
  platforms: {
    codeforces: {
      currentRating: 1847,
      maxRating: 1923,
      solved: 487,
      rank: "Candidate Master",
    },
    leetcode: {
      currentRating: 2105,
      maxRating: 2105,
      solved: 312,
      rank: "Guardian",
    },
    atcoder: {
      currentRating: 1654,
      maxRating: 1720,
      solved: 198,
      rank: "Blue",
    },
  },
  totalSolved: 997,
  growthZone: { lower: 1847, upper: 2047 },
};

export const FAKE_TAG_STATS = [
  { tag: "dp", attempted: 24, solved: 14, successRate: 58.3 },
  { tag: "graphs", attempted: 18, solved: 13, successRate: 72.2 },
  { tag: "greedy", attempted: 22, solved: 18, successRate: 81.8 },
  { tag: "bitmasking", attempted: 8, solved: 3, successRate: 37.5 },
  { tag: "math", attempted: 15, solved: 12, successRate: 80.0 },
  { tag: "strings", attempted: 12, solved: 9, successRate: 75.0 },
  { tag: "binary search", attempted: 10, solved: 8, successRate: 80.0 },
  { tag: "trees", attempted: 7, solved: 4, successRate: 57.1 },
  { tag: "number theory", attempted: 2, solved: 1, successRate: 50.0 },
  { tag: "segment tree", attempted: 5, solved: 2, successRate: 40.0 },
  { tag: "two pointers", attempted: 9, solved: 7, successRate: 77.8 },
  { tag: "dfs/bfs", attempted: 11, solved: 9, successRate: 81.8 },
];

export const FAKE_RECOMMENDATIONS = [
  {
    id: 1,
    name: "XOR on Segment",
    platform: "codeforces",
    rating: 1900,
    solveCount: 4521,
    tags: ["bitmasking", "data structures"],
    url: "https://codeforces.com/problemset/problem/242/E",
  },
  {
    id: 2,
    name: "Bitmask Subset DP",
    platform: "codeforces",
    rating: 1850,
    solveCount: 3892,
    tags: ["bitmasking", "dp"],
    url: "https://codeforces.com/problemset/problem/453/B",
  },
  {
    id: 3,
    name: "AND Sequences",
    platform: "codeforces",
    rating: 1870,
    solveCount: 3150,
    tags: ["bitmasking", "combinatorics"],
    url: "https://codeforces.com/problemset/problem/1514/C",
  },
];

export const MIN_ATTEMPTS_THRESHOLD = 3;
