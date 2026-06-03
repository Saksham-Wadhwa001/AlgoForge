// ── Tag Analysis & Growth Zone Computation ──

const MIN_ATTEMPTS_THRESHOLD = 3;

/**
 * Compute tag-level success rates from Codeforces submissions.
 *
 * Groups submissions by problem, determines if each unique problem was
 * ultimately solved (any AC) or not, then aggregates by tag.
 *
 * @param {Array} submissions — from getCodeforcesSubmissions()
 * @returns {Array<{ tag, attempted, solved, successRate, isValid }>}
 */
export function computeTagStats(submissions) {
  // Group by unique problem → collect verdicts
  const problemMap = new Map();

  for (const sub of submissions) {
    if (!problemMap.has(sub.problemId)) {
      problemMap.set(sub.problemId, {
        tags: sub.tags,
        rating: sub.rating,
        solved: false,
      });
    }
    if (sub.verdict === "OK") {
      problemMap.get(sub.problemId).solved = true;
    }
  }

  // Aggregate by tag
  const tagMap = new Map();

  for (const [, problem] of problemMap) {
    for (const tag of problem.tags) {
      if (!tagMap.has(tag)) {
        tagMap.set(tag, { tag, attempted: 0, solved: 0 });
      }
      const entry = tagMap.get(tag);
      entry.attempted++;
      if (problem.solved) entry.solved++;
    }
  }

  // Compute success rates
  const result = [];
  for (const entry of tagMap.values()) {
    const successRate =
      entry.attempted > 0 ? (entry.solved / entry.attempted) * 100 : 0;
    result.push({
      tag: entry.tag,
      attempted: entry.attempted,
      solved: entry.solved,
      successRate: Math.round(successRate * 10) / 10,
      isValid: entry.attempted >= MIN_ATTEMPTS_THRESHOLD,
    });
  }

  // Sort by success rate ascending (weakest first)
  result.sort((a, b) => a.successRate - b.successRate);

  return result;
}

/**
 * Compute the "growth zone" — a rating band where the user should practice.
 * Defined as [primaryRating - 100, primaryRating + 300].
 *
 * @param {number} primaryRating — the user's current rating on their best platform
 * @returns {{ lower: number, upper: number }}
 */
export function computeGrowthZone(primaryRating) {
  return {
    lower: Math.max(0, primaryRating - 100),
    upper: primaryRating + 300,
  };
}

/**
 * Find the weakest valid tag (lowest success rate with enough attempts).
 * @param {Array} tagStats — from computeTagStats()
 * @returns {{ tag, successRate, attempted, solved } | null}
 */
export function findWeakestTag(tagStats) {
  const valid = tagStats.filter((t) => t.isValid);
  if (valid.length === 0) return null;
  // Already sorted ascending by successRate
  return valid[0];
}

export { MIN_ATTEMPTS_THRESHOLD };
