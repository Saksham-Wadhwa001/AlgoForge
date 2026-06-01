import mongoose from "mongoose";

const platformStatsSchema = new mongoose.Schema(
  {
    currentRating: { type: Number, default: 0 },
    maxRating: { type: Number, default: 0 },
    solved: { type: Number, default: 0 },
    rank: { type: String, default: "Unrated" },
    lastFetched: { type: Date, default: null },
  },
  { _id: false }
);

const tagStatSchema = new mongoose.Schema(
  {
    tag: { type: String, required: true },
    attempted: { type: Number, default: 0 },
    solved: { type: Number, default: 0 },
    successRate: { type: Number, default: 0 },
    isValid: { type: Boolean, default: false }, // true if attempted >= MIN_THRESHOLD (3)
  },
  { _id: false }
);

const userSchema = new mongoose.Schema(
  {
    // ── Platform Handles ──
    handles: {
      codeforces: { type: String, trim: true, default: "" },
      leetcode: { type: String, trim: true, default: "" },
      atcoder: { type: String, trim: true, default: "" },
    },

    // ── Cached Platform Stats ──
    platforms: {
      codeforces: { type: platformStatsSchema, default: () => ({}) },
      leetcode: { type: platformStatsSchema, default: () => ({}) },
      atcoder: { type: platformStatsSchema, default: () => ({}) },
    },

    // ── Calculated Tag Statistics ──
    tagStats: { type: [tagStatSchema], default: [] },

    // ── Solved problem IDs for exclusion in recommendations ──
    solvedProblems: { type: [String], default: [] },

    // ── Growth Zone (computed from primary rating) ──
    growthZone: {
      lower: { type: Number, default: 0 },
      upper: { type: Number, default: 0 },
    },
  },
  {
    timestamps: true,
  }
);

// Index on handles for fast lookup
userSchema.index({ "handles.codeforces": 1 });
userSchema.index({ "handles.leetcode": 1 });
userSchema.index({ "handles.atcoder": 1 });

const User = mongoose.model("User", userSchema);

export default User;
