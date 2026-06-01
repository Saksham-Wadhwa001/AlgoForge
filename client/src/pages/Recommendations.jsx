import { motion } from "framer-motion";
import { FiTarget, FiAlertTriangle, FiTrendingUp } from "react-icons/fi";
import ProblemCard from "../components/ProblemCard";
import {
  FAKE_RECOMMENDATIONS,
  FAKE_TAG_STATS,
  FAKE_USER,
  MIN_ATTEMPTS_THRESHOLD,
} from "../data/fakeData";

export default function Recommendations() {
  const user = FAKE_USER;
  const recommendations = FAKE_RECOMMENDATIONS;

  // Find weakest valid tag
  const validTags = FAKE_TAG_STATS.filter(
    (t) => t.attempted >= MIN_ATTEMPTS_THRESHOLD
  );
  const weakest = validTags.reduce(
    (min, t) => (t.successRate < min.successRate ? t : min),
    validTags[0]
  );

  return (
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-2xl font-bold text-white">
          Smart Recommendations
        </h2>
        <p className="mt-1 text-sm text-forge-muted">
          Curated problems to strengthen your weakest areas within your Growth
          Zone.
        </p>
      </motion.div>

      {/* Targeting Info */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid gap-4 sm:grid-cols-3"
      >
        {/* Weak Tag */}
        <div className="glass-card flex items-center gap-4 rounded-2xl p-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-forge-danger/15">
            <FiAlertTriangle className="h-5 w-5 text-forge-danger" />
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-forge-muted">
              Targeting Tag
            </p>
            <p className="text-lg font-bold capitalize text-forge-danger">
              {weakest?.tag || "N/A"}
            </p>
          </div>
        </div>

        {/* Rating Bounds */}
        <div className="glass-card flex items-center gap-4 rounded-2xl p-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-forge-accent/15">
            <FiTrendingUp className="h-5 w-5 text-forge-accent-light" />
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-forge-muted">
              Rating Range
            </p>
            <p className="text-lg font-bold text-forge-accent-light">
              {user.platforms.codeforces.currentRating} –{" "}
              {user.platforms.codeforces.currentRating + 100}
            </p>
          </div>
        </div>

        {/* Success Rate */}
        <div className="glass-card flex items-center gap-4 rounded-2xl p-5">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-forge-warning/15">
            <FiTarget className="h-5 w-5 text-forge-warning" />
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-wider text-forge-muted">
              Current Rate
            </p>
            <p className="text-lg font-bold text-forge-warning">
              {weakest?.successRate.toFixed(1)}%
            </p>
          </div>
        </div>
      </motion.div>

      {/* Section Divider */}
      <div className="flex items-center gap-3">
        <div className="h-px flex-1 bg-forge-border" />
        <span className="text-xs font-medium uppercase tracking-wider text-forge-muted">
          Top {recommendations.length} Unsolved Problems
        </span>
        <div className="h-px flex-1 bg-forge-border" />
      </div>

      {/* Problem Cards */}
      <div className="grid gap-5 lg:grid-cols-3">
        {recommendations.map((problem, index) => (
          <ProblemCard key={problem.id} problem={problem} index={index} />
        ))}
      </div>

      {/* Footer Note */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="glass-card rounded-2xl p-5"
      >
        <div className="flex items-start gap-3">
          <FiTarget className="mt-0.5 h-4 w-4 shrink-0 text-forge-accent-light" />
          <div className="text-xs text-forge-muted">
            <p className="mb-1 font-medium text-forge-text">
              How recommendations work
            </p>
            <p>
              We identify your weakest tag with a valid sample size (≥
              {MIN_ATTEMPTS_THRESHOLD} attempts), then find unsolved problems
              tagged with that topic within your current rating to current rating
              + 100. Results are sorted by community solve count so you start
              with the most well-known problems.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
