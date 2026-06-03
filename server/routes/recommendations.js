// ── Recommendations Route ──
// POST /api/recommendations
// Returns CF problems filtered by tag and rating range

import express from "express";
import { getCodeforcesProblems } from "../services/codeforces.js";

const router = express.Router();

// POST /api/recommendations
// Body: { weakestTag: "dp", growthZone: { lower: 1300, upper: 1700 }, limit?: 6 }
router.post("/", async (req, res) => {
  try {
    const { weakestTag, growthZone, limit = 6 } = req.body;

    if (!weakestTag || !growthZone) {
      return res.status(400).json({
        success: false,
        error: "weakestTag and growthZone are required.",
      });
    }

    // Fetch all problems with the target tag from Codeforces
    const allProblems = await getCodeforcesProblems(weakestTag);

    // Filter by rating range
    const filtered = allProblems.filter(
      (p) => p.rating >= growthZone.lower && p.rating <= growthZone.upper && p.rating > 0
    );

    // Sort by solvedCount descending (most popular = most community-validated)
    filtered.sort((a, b) => b.solvedCount - a.solvedCount);

    // Take top N
    const recommendations = filtered.slice(0, limit);

    res.json({
      success: true,
      data: {
        targetTag: weakestTag,
        growthZone,
        recommendations,
        totalMatches: filtered.length,
      },
    });
  } catch (error) {
    res.status(502).json({ success: false, error: error.message });
  }
});

export default router;
