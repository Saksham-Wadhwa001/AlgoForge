import { motion } from "framer-motion";
import { FiExternalLink, FiUsers, FiStar } from "react-icons/fi";

const platformBadge = {
  codeforces: { label: "CF", color: "bg-forge-cf/20 text-forge-cf border-forge-cf/30" },
  leetcode: { label: "LC", color: "bg-forge-lc/20 text-forge-lc border-forge-lc/30" },
  atcoder: { label: "AC", color: "bg-forge-ac/20 text-forge-ac border-forge-ac/30" },
};

export default function ProblemCard({ problem, index = 0 }) {
  const badge = platformBadge[problem.platform] || platformBadge.codeforces;

  return (
    <motion.div
      initial={{ opacity: 0, x: -30 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: index * 0.15 }}
      whileHover={{ scale: 1.02, transition: { duration: 0.2 } }}
      className="glass-card group relative overflow-hidden rounded-2xl p-6 transition-all duration-300 hover:border-forge-accent/30"
    >
      {/* Index badge */}
      <div className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-lg bg-forge-accent/10 text-sm font-bold text-forge-accent-light">
        #{index + 1}
      </div>

      {/* Problem name */}
      <h3 className="mb-3 pr-12 text-lg font-semibold text-white transition-colors group-hover:text-forge-accent-light">
        {problem.name}
      </h3>

      {/* Meta row */}
      <div className="mb-4 flex flex-wrap items-center gap-3">
        <span className={`rounded-md border px-2 py-0.5 text-xs font-medium ${badge.color}`}>
          {badge.label}
        </span>
        <span className="flex items-center gap-1 text-xs text-forge-muted">
          <FiStar className="h-3 w-3" />
          {problem.rating}
        </span>
        <span className="flex items-center gap-1 text-xs text-forge-muted">
          <FiUsers className="h-3 w-3" />
          {problem.solveCount.toLocaleString()} solves
        </span>
      </div>

      {/* Tags */}
      <div className="mb-5 flex flex-wrap gap-2">
        {problem.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-forge-bg px-3 py-1 text-xs text-forge-muted"
          >
            {tag}
          </span>
        ))}
      </div>

      {/* Action */}
      <a
        href={problem.url}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-2 rounded-xl bg-forge-accent/10 px-4 py-2 text-sm font-medium text-forge-accent-light transition-all duration-200 hover:bg-forge-accent/20"
      >
        Solve Problem
        <FiExternalLink className="h-3.5 w-3.5" />
      </a>
    </motion.div>
  );
}
