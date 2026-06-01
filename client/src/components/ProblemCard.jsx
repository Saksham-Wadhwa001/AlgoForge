import { motion } from "framer-motion";
import { FiExternalLink, FiUsers, FiStar } from "react-icons/fi";

const platformBadge = {
  codeforces: { label: "Codeforces", short: "CF", color: "text-blue-400 bg-blue-500/10 border-blue-500/20", glow: "group-hover:shadow-[0_0_15px_rgba(59,130,246,0.2)]", dot: "bg-blue-400" },
  leetcode: { label: "LeetCode", short: "LC", color: "text-amber-400 bg-amber-500/10 border-amber-500/20", glow: "group-hover:shadow-[0_0_15px_rgba(245,158,11,0.2)]", dot: "bg-amber-400" },
  atcoder: { label: "AtCoder", short: "AC", color: "text-emerald-400 bg-emerald-500/10 border-emerald-500/20", glow: "group-hover:shadow-[0_0_15px_rgba(16,185,129,0.2)]", dot: "bg-emerald-400" },
};

export default function ProblemCard({ problem, index = 0 }) {
  const badge = platformBadge[problem.platform] || platformBadge.codeforces;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, scale: 1.02 }}
      className={`glass-card group relative overflow-hidden rounded-3xl p-7 transition-all duration-500 hover:border-white/20 ${badge.glow}`}
    >
      {/* Background Gradient Hover State */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/[0.03] to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
      
      <div className="relative z-10 flex flex-col h-full">
        {/* Header */}
        <div className="flex items-start justify-between gap-4 mb-4">
          <h3 className="text-xl font-bold text-white tracking-tight transition-colors duration-300 group-hover:text-forge-accent-light">
            {problem.name}
          </h3>
          <div className="flex shrink-0 h-8 w-8 items-center justify-center rounded-xl bg-white/5 border border-white/10 text-xs font-bold text-white shadow-sm">
            #{index + 1}
          </div>
        </div>

        {/* Meta row */}
        <div className="mb-6 flex flex-wrap items-center gap-3">
          <span className={`flex items-center gap-1.5 rounded-lg border px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest ${badge.color}`}>
            <span className={`h-1.5 w-1.5 rounded-full ${badge.dot}`} />
            {badge.short}
          </span>
          <span className="flex items-center gap-1.5 rounded-lg bg-black/20 border border-white/5 px-2.5 py-1 text-xs font-bold text-forge-muted">
            <FiStar className="h-3 w-3 text-amber-400" />
            {problem.rating}
          </span>
          <span className="flex items-center gap-1.5 rounded-lg bg-black/20 border border-white/5 px-2.5 py-1 text-xs font-bold text-forge-muted">
            <FiUsers className="h-3 w-3 text-blue-400" />
            {problem.solveCount.toLocaleString()}
          </span>
        </div>

        {/* Tags */}
        <div className="mb-8 flex flex-wrap gap-2">
          {problem.tags.map((tag) => (
            <span
              key={tag}
              className="rounded-lg bg-white/5 border border-white/5 px-3 py-1.5 text-[11px] font-medium text-forge-muted transition-colors duration-300 group-hover:bg-white/10 group-hover:text-white"
            >
              {tag}
            </span>
          ))}
        </div>

        {/* Action Button */}
        <div className="mt-auto">
          <a
            href={problem.url}
            target="_blank"
            rel="noopener noreferrer"
            className="group/btn relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-forge-accent/10 border border-forge-accent/20 px-4 py-3 text-sm font-bold text-forge-accent-light transition-all duration-300 hover:bg-forge-accent hover:text-white hover:border-forge-accent hover:shadow-[0_0_20px_rgba(129,140,248,0.4)]"
          >
            <span className="relative z-10">Solve Problem</span>
            <FiExternalLink className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover/btn:-translate-y-0.5 group-hover/btn:translate-x-0.5" />
          </a>
        </div>
      </div>
    </motion.div>
  );
}
