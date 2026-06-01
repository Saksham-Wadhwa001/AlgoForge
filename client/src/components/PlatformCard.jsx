import { motion } from "framer-motion";
import { FiTrendingUp, FiCheckCircle } from "react-icons/fi";

const platformConfig = {
  codeforces: {
    name: "Codeforces",
    gradient: "from-blue-500/10 to-indigo-600/10",
    gradientActive: "from-blue-500/20 to-indigo-600/20",
    border: "border-blue-500/20",
    borderHover: "group-hover:border-blue-500/40",
    accent: "text-blue-400",
    dot: "bg-blue-400",
    icon: "CF",
    barGradient: "linear-gradient(90deg, #3b82f6, #6366f1)",
    barShadow: "0 0 10px rgba(59,130,246,0.5)",
  },
  leetcode: {
    name: "LeetCode",
    gradient: "from-amber-500/10 to-orange-600/10",
    gradientActive: "from-amber-500/20 to-orange-600/20",
    border: "border-amber-500/20",
    borderHover: "group-hover:border-amber-500/40",
    accent: "text-amber-400",
    dot: "bg-amber-400",
    icon: "LC",
    barGradient: "linear-gradient(90deg, #f59e0b, #ea580c)",
    barShadow: "0 0 10px rgba(245,158,11,0.5)",
  },
  atcoder: {
    name: "AtCoder",
    gradient: "from-emerald-500/10 to-teal-600/10",
    gradientActive: "from-emerald-500/20 to-teal-600/20",
    border: "border-emerald-500/20",
    borderHover: "group-hover:border-emerald-500/40",
    accent: "text-emerald-400",
    dot: "bg-emerald-400",
    icon: "AC",
    barGradient: "linear-gradient(90deg, #10b981, #0d9488)",
    barShadow: "0 0 10px rgba(16,185,129,0.5)",
  },
};

export default function PlatformCard({ platform, data, delay = 0 }) {
  const config = platformConfig[platform];
  if (!config || !data) return null;

  const ratingProgress = data.maxRating > 0
    ? Math.round((data.currentRating / data.maxRating) * 100)
    : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, scale: 1.02 }}
      className={`glass-card group relative overflow-hidden rounded-3xl border ${config.border} ${config.borderHover} p-6 transition-all duration-500`}
    >
      {/* Background gradient subtle */}
      <div className={`absolute inset-0 bg-gradient-to-br ${config.gradient} transition-opacity duration-500 group-hover:opacity-0`} />
      {/* Background gradient active (hover) */}
      <div className={`absolute inset-0 bg-gradient-to-br ${config.gradientActive} opacity-0 transition-opacity duration-500 group-hover:opacity-100`} />

      <div className="relative z-10">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${config.gradientActive} border ${config.border} shadow-lg`}>
              <span className={`text-base font-extrabold ${config.accent}`}>
                {config.icon}
              </span>
            </div>
            <div>
              <h3 className="text-base font-bold text-white tracking-tight">{config.name}</h3>
              <p className="text-xs font-medium text-forge-muted mt-0.5">{data.rank}</p>
            </div>
          </div>
          <div className={`h-2.5 w-2.5 rounded-full ${config.dot} shadow-[0_0_8px_currentColor] animate-pulse`} />
        </div>

        {/* Rating */}
        <div className="mb-6">
          <div className="flex items-baseline gap-2 mb-3">
            <span className={`text-4xl font-extrabold tracking-tight ${config.accent} drop-shadow-md`}>
              {data.currentRating}
            </span>
            <span className="text-xs font-semibold uppercase tracking-widest text-forge-muted">rating</span>
          </div>
          {/* Progress bar */}
          <div className="relative h-2 w-full overflow-hidden rounded-full bg-black/40 border border-white/5">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${ratingProgress}%` }}
              transition={{ duration: 1.2, delay: delay + 0.3, ease: "easeOut" }}
              className="absolute top-0 left-0 h-full rounded-full"
              style={{
                background: config.barGradient,
                boxShadow: config.barShadow,
              }}
            />
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-black/20 border border-white/5 px-4 py-3 transition-colors duration-300 group-hover:bg-black/30">
            <div className="flex items-center gap-2">
              <FiTrendingUp className="h-3.5 w-3.5 text-forge-muted" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-forge-muted">
                Max
              </span>
            </div>
            <p className="mt-1.5 text-lg font-bold text-white">
              {data.maxRating}
            </p>
          </div>
          <div className="rounded-2xl bg-black/20 border border-white/5 px-4 py-3 transition-colors duration-300 group-hover:bg-black/30">
            <div className="flex items-center gap-2">
              <FiCheckCircle className="h-3.5 w-3.5 text-forge-muted" />
              <span className="text-[10px] font-bold uppercase tracking-widest text-forge-muted">
                Solved
              </span>
            </div>
            <p className="mt-1.5 text-lg font-bold text-white">
              {data.solved}
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
