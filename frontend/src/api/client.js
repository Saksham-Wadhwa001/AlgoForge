// ── AlgoForge API Client ──
// All API calls go through /api (proxied to backend in dev via Vite)

const BASE = "/api";

/**
 * Generic fetch wrapper with error handling.
 */
async function apiFetch(url, options = {}) {
  const res = await fetch(url, {
    headers: { "Content-Type": "application/json" },
    ...options,
  });

  const json = await res.json();

  if (!res.ok || !json.success) {
    throw new Error(json.error || `API error (${res.status})`);
  }

  return json.data;
}

// ── Platform Profiles ──

/**
 * Fetch a single platform profile.
 * @param {"codeforces"|"leetcode"|"atcoder"} platform
 * @param {string} handle
 */
export async function fetchPlatformProfile(platform, handle) {
  return apiFetch(`${BASE}/platforms/${platform}/${encodeURIComponent(handle)}`);
}

/**
 * Fetch all platform profiles in parallel.
 * @param {{ codeforces?: string, leetcode?: string, atcoder?: string }} handles
 * @returns {{ platforms, totalSolved, peakRating, errors? }}
 */
export async function fetchAllProfiles(handles) {
  return apiFetch(`${BASE}/platforms/all`, {
    method: "POST",
    body: JSON.stringify(handles),
  });
}

// ── Tag Analysis ──

/**
 * Fetch tag analysis for given handles.
 * @param {{ codeforces: string, leetcode?: string }} handles
 * @returns {{ tagStats, growthZone, weakestTag, totalSubmissionsAnalyzed, uniqueProblemsAnalyzed }}
 */
export async function fetchAnalysis(handles) {
  return apiFetch(`${BASE}/analyze`, {
    method: "POST",
    body: JSON.stringify(handles),
  });
}

// ── Recommendations ──

/**
 * Fetch problem recommendations.
 * @param {string} weakestTag
 * @param {{ lower: number, upper: number }} growthZone
 * @param {number} [limit=6]
 * @returns {{ targetTag, growthZone, recommendations, totalMatches }}
 */
export async function fetchRecommendations(weakestTag, growthZone, limit = 6) {
  return apiFetch(`${BASE}/recommendations`, {
    method: "POST",
    body: JSON.stringify({ weakestTag, growthZone, limit }),
  });
}
