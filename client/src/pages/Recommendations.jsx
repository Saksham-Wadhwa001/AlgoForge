import { motion } from "framer-motion";
import { FiTarget, FiAlertTriangle, FiTrendingUp, FiCrosshair } from "react-icons/fi";
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
    <div className="space-y-10">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col gap-2"
      >
        <h2 className="text-3xl font-extrabold tracking-tight text-white">
          Smart Recommendations
        </h2>
        <p className="text-sm font-medium text-forge-muted">
          Curated problem sets specifically targeted to strengthen your weakest areas.
        </p>
      </motion.div>

      {/* Targeting Info Cards */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="grid gap-5 sm:grid-cols-3"
      >
        {/* Weak Tag */}
        <div className="glass-card relative overflow-hidden flex items-center gap-5 rounded-3xl p-6 border-red-500/20 group hover:border-red-500/40 transition-colors">
          <div className="absolute inset-0 bg-gradient-to-br from-red-500/5 to-transparent pointer-events-none" />
          <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-red-500/10 border border-red-500/20 shadow-[0_0_15px_rgba(239,68,68,0.1)] transition-transform duration-500 group-hover:scale-110">
            <FiAlertTriangle className="h-6 w-6 text-red-400" />
          </div>
          <div className="relative z-10 min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-widest text-forge-muted mb-1">
              Targeting Tag
            </p>
            <p className="text-xl font-bold capitalize text-white truncate">
              {weakest?.tag || "N/A"}
            </p>
          </div>
        </div>

        {/* Rating Bounds */}
        <div className="glass-card relative overflow-hidden flex items-center gap-5 rounded-3xl p-6 border-forge-accent/20 group hover:border-forge-accent/40 transition-colors">
          <div className="absolute inset-0 bg-gradient-to-br from-forge-accent/5 to-transparent pointer-events-none" />
          <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-forge-accent/10 border border-forge-accent/20 shadow-[0_0_15px_rgba(129,140,248,0.1)] transition-transform duration-500 group-hover:scale-110">
            <FiTrendingUp className="h-6 w-6 text-forge-accent-light" />
          </div>
          <div className="relative z-10 min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-widest text-forge-muted mb-1">
              Rating Range
            </p>
            <p className="text-xl font-bold text-white truncate">
              {user.platforms.codeforces.currentRating} –{" "}
              {user.platforms.codeforces.currentRating + 100}
            </p>
          </div>
        </div>

        {/* Success Rate */}
        <div className="glass-card relative overflow-hidden flex items-center gap-5 rounded-3xl p-6 border-amber-500/20 group hover:border-amber-500/40 transition-colors">
          <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 to-transparent pointer-events-none" />
          <div className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-amber-500/10 border border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.1)] transition-transform duration-500 group-hover:scale-110">
            <FiCrosshair className="h-6 w-6 text-amber-400" />
          </div>
          <div className="relative z-10 min-w-0">
            <p className="text-[10px] font-bold uppercase tracking-widest text-forge-muted mb-1">
              Current Rate
            </p>
            <p className="text-xl font-bold text-white truncate">
              {weakest?.successRate.toFixed(1)}%
            </p>
          </div>
        </div>
      </motion.div>

      {/* Section Divider */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.3 }}
        className="flex items-center gap-4"
      >
        <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-white/10" />
        <span className="text-[10px] font-bold uppercase tracking-widest text-forge-accent-light bg-forge-accent/10 border border-forge-accent/20 px-3 py-1 rounded-full">
          Top {recommendations.length} Unsolved
        </span>
        <div className="h-px flex-1 bg-gradient-to-l from-transparent via-white/10 to-white/10" />
      </motion.div>

      {/* Problem Cards Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {recommendations.map((problem, index) => (
          <ProblemCard key={problem.id} problem={problem} index={index} />
        ))}
      </div>

      {/* Footer Note */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="glass-card relative overflow-hidden rounded-3xl p-6 border-white/5"
      >
        <div className="relative z-10 flex items-start gap-4">
          <div className="mt-1 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-white/5 border border-white/10">
            <FiTarget className="h-4 w-4 text-forge-accent-light" />
          </div>
          <div>
            <p className="mb-1 text-sm font-bold text-white tracking-tight">
              Algorithm Methodology
            </p>
            <p className="text-xs font-medium leading-relaxed text-forge-muted/80">
              We identify your weakest tag with a valid sample size (≥
              <strong className="text-forge-muted mx-1">{MIN_ATTEMPTS_THRESHOLD}</strong> 
              attempts), then query for unsolved problems matching that specific topic within your optimal rating range. 
              Results are sorted algorithmically by community solve count to ensure you practice the most standard and high-quality problems first.
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
