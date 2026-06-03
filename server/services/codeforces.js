// ── Codeforces API Service ──
// Public API docs: https://codeforces.com/apiHelp

const CF_BASE = "https://codeforces.com/api";

/**
 * Fetch user profile from Codeforces.
 * @param {string} handle
 * @returns {{ currentRating, maxRating, rank, solved, handle }}
 */
export async function getCodeforcesProfile(handle) {
  const [infoRes, statusRes] = await Promise.all([
    fetch(`${CF_BASE}/user.info?handles=${encodeURIComponent(handle)}`),
    fetch(`${CF_BASE}/user.status?handle=${encodeURIComponent(handle)}&from=1&count=10000`),
  ]);

  if (!infoRes.ok) {
    const err = await infoRes.json().catch(() => ({}));
    throw new Error(err.comment || `Codeforces user.info failed (${infoRes.status})`);
  }

  const infoData = await infoRes.json();
  if (infoData.status !== "OK" || !infoData.result?.length) {
    throw new Error(infoData.comment || "User not found on Codeforces");
  }

  const user = infoData.result[0];

  // Count unique solved problems from submissions
  let solved = 0;
  if (statusRes.ok) {
    const statusData = await statusRes.json();
    if (statusData.status === "OK") {
      const solvedSet = new Set();
      for (const sub of statusData.result) {
        if (sub.verdict === "OK") {
          solvedSet.add(`${sub.problem.contestId}-${sub.problem.index}`);
        }
      }
      solved = solvedSet.size;
    }
  }

  return {
    handle: user.handle,
    currentRating: user.rating ?? 0,
    maxRating: user.maxRating ?? 0,
    rank: user.rank ?? "Unrated",
    solved,
  };
}

/**
 * Fetch recent submissions for tag analysis.
 * Returns problems attempted in the growth zone with verdict info.
 * @param {string} handle
 * @param {number} [count=500] — max submissions to fetch
 * @returns {Array<{ problemId, name, rating, tags, verdict }>}
 */
export async function getCodeforcesSubmissions(handle, count = 500) {
  const res = await fetch(
    `${CF_BASE}/user.status?handle=${encodeURIComponent(handle)}&from=1&count=${count}`
  );

  if (!res.ok) {
    const err = await res.json().catch(() => ({}));
    throw new Error(err.comment || `Codeforces user.status failed (${res.status})`);
  }

  const data = await res.json();
  if (data.status !== "OK") {
    throw new Error(data.comment || "Failed to fetch submissions");
  }

  return data.result.map((sub) => ({
    problemId: `${sub.problem.contestId}-${sub.problem.index}`,
    name: sub.problem.name,
    rating: sub.problem.rating ?? 0,
    tags: sub.problem.tags ?? [],
    verdict: sub.verdict,
  }));
}

/**
 * Fetch problems from CF problemset, optionally filtered by tag.
 * @param {string} [tag] — filter by this tag
 * @returns {Array<{ id, name, rating, tags, solvedCount, url }>}
 */
export async function getCodeforcesProblems(tag) {
  const url = tag
    ? `${CF_BASE}/problemset.problems?tags=${encodeURIComponent(tag)}`
    : `${CF_BASE}/problemset.problems`;

  const res = await fetch(url);
  if (!res.ok) throw new Error(`CF problemset.problems failed (${res.status})`);

  const data = await res.json();
  if (data.status !== "OK") throw new Error(data.comment || "Failed to fetch problems");

  const { problems, problemStatistics } = data.result;

  // Build a map of solvedCount by contestId-index
  const statsMap = new Map();
  for (const stat of problemStatistics) {
    statsMap.set(`${stat.contestId}-${stat.index}`, stat.solvedCount);
  }

  return problems.map((p) => {
    const id = `${p.contestId}-${p.index}`;
    return {
      id,
      name: p.name,
      rating: p.rating ?? 0,
      tags: p.tags ?? [],
      solvedCount: statsMap.get(id) ?? 0,
      url: `https://codeforces.com/problemset/problem/${p.contestId}/${p.index}`,
      platform: "codeforces",
    };
  });
}
