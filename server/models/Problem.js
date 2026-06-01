import mongoose from "mongoose";

const problemSchema = new mongoose.Schema(
  {
    // ── Unique external identifier (e.g., "CF-1200A", "LC-42", "AC-abc200_d") ──
    externalId: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },

    // ── Problem details ──
    name: { type: String, required: true },
    platform: {
      type: String,
      enum: ["codeforces", "leetcode", "atcoder"],
      required: true,
      index: true,
    },
    rating: { type: Number, default: 0, index: true },
    tags: { type: [String], default: [], index: true },
    solveCount: { type: Number, default: 0 },
    url: { type: String, default: "" },
  },
  {
    timestamps: true,
  }
);

// Compound index for the recommendation query:
// Filter by tags + rating range, sort by solveCount
problemSchema.index({ tags: 1, rating: 1, solveCount: -1 });

const Problem = mongoose.model("Problem", problemSchema);

export default Problem;
