// ── LeetCode GraphQL Service ──
// Unofficial GraphQL endpoint: https://leetcode.com/graphql

const LC_GRAPHQL = "https://leetcode.com/graphql";

const HEADERS = {
  "Content-Type": "application/json",
  Referer: "https://leetcode.com",
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
};

/**
 * Send a GraphQL query to LeetCode.
 */
async function queryLeetCode(query, variables = {}) {
  const res = await fetch(LC_GRAPHQL, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({ query, variables }),
  });

  if (!res.ok) {
    throw new Error(`LeetCode GraphQL request failed (${res.status})`);
  }

  const json = await res.json();
  if (json.errors?.length) {
    throw new Error(json.errors[0].message || "LeetCode GraphQL error");
  }

  return json.data;
}

/**
 * Fetch user profile from LeetCode.
 * @param {string} handle
 * @returns {{ rating, solved, rank, solvedByDifficulty, handle }}
 */
export async function getLeetCodeProfile(handle) {
  const query = `
    query getUserProfile($username: String!) {
      matchedUser(username: $username) {
        username
        profile {
          ranking
        }
        submitStatsGlobal {
          acSubmissionNum {
            difficulty
            count
          }
        }
      }
      userContestRanking(username: $username) {
        rating
        attendedContestsCount
        topPercentage
      }
    }
  `;

  const data = await queryLeetCode(query, { username: handle });

  if (!data.matchedUser) {
    throw new Error(`LeetCode user "${handle}" not found`);
  }

  const user = data.matchedUser;
  const contest = data.userContestRanking;
  const acStats = user.submitStatsGlobal?.acSubmissionNum ?? [];

  // Total solved = the "All" difficulty entry
  const totalSolved = acStats.find((s) => s.difficulty === "All")?.count ?? 0;

  // Solved by difficulty
  const solvedByDifficulty = {};
  for (const stat of acStats) {
    if (stat.difficulty !== "All") {
      solvedByDifficulty[stat.difficulty.toLowerCase()] = stat.count;
    }
  }

  return {
    handle: user.username,
    currentRating: Math.round(contest?.rating ?? 0),
    maxRating: Math.round(contest?.rating ?? 0), // LC doesn't expose max separately
    rank: user.profile?.ranking ? `#${user.profile.ranking.toLocaleString()}` : "Unranked",
    solved: totalSolved,
    contestsAttended: contest?.attendedContestsCount ?? 0,
    topPercentage: contest?.topPercentage ?? null,
    solvedByDifficulty,
  };
}

/**
 * Fetch recent accepted submissions for tag analysis.
 * @param {string} handle
 * @param {number} [limit=50]
 * @returns {Array<{ title, titleSlug, difficulty }>}
 */
export async function getLeetCodeSubmissions(handle, limit = 50) {
  const query = `
    query recentAcSubmissions($username: String!, $limit: Int!) {
      recentAcSubmissionList(username: $username, limit: $limit) {
        title
        titleSlug
        timestamp
      }
    }
  `;

  const data = await queryLeetCode(query, { username: handle, limit });
  return data.recentAcSubmissionList ?? [];
}
