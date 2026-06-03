// ── Analyze Route ──
// POST /api/analyze
// Fetches submissions from Codeforces, computes tag stats + growth zone

import express from "express";
import { getCodeforcesSubmissions } from "../services/codeforces.js";
import { computeTagStats, computeGrowthZone, findWeakestTag } from "../services/analyzer.js";
import { getCodeforcesProfile } from "../services/codeforces.js";

const router = express.Router();

// POST /api/analyze
// Body: { codeforces: "handle", leetcode?: "handle" }
router.post("/", async (req, res) => {
  try {
    const { codeforces, leetcode } = req.body;

    if (!codeforces) {
      return res.status(400).json({
        success: false,
        error: "A Codeforces handle is required for tag analysis (submissions with tag data).",
      });
    }

    // Fetch CF submissions for tag analysis
    const [submissions, cfProfile] = await Promise.all([
      getCodeforcesSubmissions(codeforces, 1000),
      getCodeforcesProfile(codeforces),
    ]);

    // Compute tag stats from submissions
    const tagStats = computeTagStats(submissions);

    // Compute growth zone from CF rating
    const growthZone = computeGrowthZone(cfProfile.currentRating);

    // Find weakest valid tag
    const weakestTag = findWeakestTag(tagStats);

    res.json({
      success: true,
      data: {
        tagStats,
        growthZone,
        weakestTag,
        totalSubmissionsAnalyzed: submissions.length,
        uniqueProblemsAnalyzed: new Set(submissions.map((s) => s.problemId)).size,
      },
    });
  } catch (error) {
    res.status(502).json({ success: false, error: error.message });
  }
});

export default router;
