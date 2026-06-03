// ── Platform Routes ──
// GET  /api/platforms/codeforces/:handle
// GET  /api/platforms/leetcode/:handle
// GET  /api/platforms/atcoder/:handle
// POST /api/platforms/all

import express from "express";
import { getCodeforcesProfile } from "../services/codeforces.js";
import { getLeetCodeProfile } from "../services/leetcode.js";
import { getAtCoderProfile } from "../services/atcoder.js";

const router = express.Router();

// ── Individual platform profile endpoints ──

router.get("/codeforces/:handle", async (req, res) => {
  try {
    const profile = await getCodeforcesProfile(req.params.handle);
    res.json({ success: true, platform: "codeforces", data: profile });
  } catch (error) {
    res.status(502).json({ success: false, platform: "codeforces", error: error.message });
  }
});

router.get("/leetcode/:handle", async (req, res) => {
  try {
    const profile = await getLeetCodeProfile(req.params.handle);
    res.json({ success: true, platform: "leetcode", data: profile });
  } catch (error) {
    res.status(502).json({ success: false, platform: "leetcode", error: error.message });
  }
});

router.get("/atcoder/:handle", async (req, res) => {
  try {
    const profile = await getAtCoderProfile(req.params.handle);
    res.json({ success: true, platform: "atcoder", data: profile });
  } catch (error) {
    res.status(502).json({ success: false, platform: "atcoder", error: error.message });
  }
});

// ── Fetch all platforms in parallel ──
// Body: { codeforces?: "handle", leetcode?: "handle", atcoder?: "handle" }

router.post("/all", async (req, res) => {
  try {
    const { codeforces, leetcode, atcoder } = req.body;
    const results = {};
    const errors = {};

    const tasks = [];

    if (codeforces) {
      tasks.push(
        getCodeforcesProfile(codeforces)
          .then((data) => { results.codeforces = data; })
          .catch((err) => { errors.codeforces = err.message; })
      );
    }

    if (leetcode) {
      tasks.push(
        getLeetCodeProfile(leetcode)
          .then((data) => { results.leetcode = data; })
          .catch((err) => { errors.leetcode = err.message; })
      );
    }

    if (atcoder) {
      tasks.push(
        getAtCoderProfile(atcoder)
          .then((data) => { results.atcoder = data; })
          .catch((err) => { errors.atcoder = err.message; })
      );
    }

    await Promise.all(tasks);

    // Compute aggregate stats
    const platforms = Object.values(results);
    const totalSolved = platforms.reduce((sum, p) => sum + (p.solved ?? 0), 0);
    const peakRating = platforms.reduce((max, p) => Math.max(max, p.maxRating ?? 0), 0);

    res.json({
      success: true,
      data: {
        platforms: results,
        errors: Object.keys(errors).length > 0 ? errors : undefined,
        totalSolved,
        peakRating,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
});

export default router;
