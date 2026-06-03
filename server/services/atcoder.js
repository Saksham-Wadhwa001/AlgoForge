// ── AtCoder API Service ──
// Rating history: https://atcoder.jp/users/{handle}/history/json
// AC count: https://kenkoooo.com/atcoder/atcoder-api/v3/user/ac_count?user={handle}

/**
 * Map AtCoder rating to color/rank name.
 */
function atcoderRank(rating) {
  if (rating >= 2800) return "Red";
  if (rating >= 2400) return "Orange";
  if (rating >= 2000) return "Yellow";
  if (rating >= 1600) return "Blue";
  if (rating >= 1200) return "Cyan";
  if (rating >= 800) return "Green";
  if (rating >= 400) return "Brown";
  if (rating >= 1) return "Gray";
  return "Unrated";
}

/**
 * Fetch user profile from AtCoder.
 * @param {string} handle
 * @returns {{ currentRating, maxRating, rank, solved, handle }}
 */
export async function getAtCoderProfile(handle) {
  // Fetch rating history
  const historyRes = await fetch(
    `https://atcoder.jp/users/${encodeURIComponent(handle)}/history/json`
  );

  if (!historyRes.ok) {
    throw new Error(`AtCoder user "${handle}" not found (${historyRes.status})`);
  }

  const history = await historyRes.json();

  let currentRating = 0;
  let maxRating = 0;

  if (history.length > 0) {
    currentRating = history[history.length - 1].NewRating ?? 0;
    maxRating = Math.max(...history.map((h) => h.NewRating ?? 0));
  }

  // Fetch solved count from kenkoooo's API
  let solved = 0;
  try {
    const acRes = await fetch(
      `https://kenkoooo.com/atcoder/atcoder-api/v3/user/ac_count?user=${encodeURIComponent(handle)}`
    );
    if (acRes.ok) {
      const acData = await acRes.json();
      solved = acData.count ?? acData ?? 0;
      // The API returns a plain number
      if (typeof acData === "number") solved = acData;
    }
  } catch {
    // Non-critical — just leave solved at 0
  }

  return {
    handle,
    currentRating,
    maxRating,
    rank: atcoderRank(currentRating),
    solved,
  };
}
