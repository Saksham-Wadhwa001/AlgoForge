import { motion } from "framer-motion";
import { FiActivity, FiAlertTriangle, FiCheckCircle } from "react-icons/fi";
import TagChart from "../components/TagChart";
import { FAKE_TAG_STATS, FAKE_USER, MIN_ATTEMPTS_THRESHOLD } from "../data/fakeData";

function StatusBadge({ rate, isValid }) {
  if (!isValid) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-lg bg-slate-800/50 border border-slate-700 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-forge-muted">
        Insufficient Data
      </span>
    );
  }
  if (rate >= 70) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-emerald-400">
        <FiCheckCircle className="h-3 w-3" /> Strong
      </span>
    );
  }
  if (rate >= 40) {
    return (
      <span className="inline-flex items-center gap-1.5 rounded-lg bg-amber-500/10 border border-amber-500/20 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-amber-400">
        <FiAlertTriangle className="h-3 w-3" /> Moderate
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1.5 rounded-lg bg-red-500/10 border border-red-500/20 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-red-400">
      <FiAlertTriangle className="h-3 w-3" /> Weak
    </span>
  );
}

const tableRowVariants = {
  hidden: { opacity: 0, y: 10 },
  show: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.4, delay: i * 0.05, ease: [0.22, 1, 0.36, 1] },
  }),
};

export default function TagAnalyzer() {
  const tagStats = FAKE_TAG_STATS;
  const user = FAKE_USER;

  const sortedStats = [...tagStats].sort(
    (a, b) => a.successRate - b.successRate
  );

  const weakestValid = sortedStats.find(
    (t) => t.attempted >= MIN_ATTEMPTS_THRESHOLD
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
        <h2 className="text-3xl font-extrabold tracking-tight text-white">Tag Weakness Analyzer</h2>
        <p className="text-sm font-medium text-forge-muted">
          Analyzing submissions in your Growth Zone ({user.growthZone.lower}–
          {user.growthZone.upper}) from the last 6 months.
        </p>
      </motion.div>

      {/* Weakest tag banner */}
      {weakestValid && (
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 10 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="relative overflow-hidden flex items-center gap-5 rounded-3xl border border-red-500/30 bg-gradient-to-r from-red-500/10 to-transparent p-6 shadow-lg shadow-red-500/5"
        >
          <div className="absolute top-0 left-0 w-1 h-full bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.8)]" />
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/20 border border-red-500/30 shadow-[0_0_20px_rgba(239,68,68,0.15)]">
            <FiAlertTriangle className="h-6 w-6 text-red-400" />
          </div>
          <div>
            <p className="text-base font-bold text-white mb-1">
              Weakest Area:{" "}
              <span className="capitalize text-red-400 drop-shadow-sm">
                {weakestValid.tag}
              </span>
            </p>
            <p className="text-sm font-medium text-forge-muted">
              <strong className="text-white">{weakestValid.successRate.toFixed(1)}%</strong> success rate with{" "}
              <strong className="text-white">{weakestValid.attempted}</strong> problems attempted. Focus here to level up.
            </p>
          </div>
        </motion.div>
      )}

      {/* Chart */}
      <TagChart tagStats={tagStats} />

      {/* Data Table */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
        className="glass-card overflow-hidden rounded-3xl"
      >
        <div className="border-b border-white/5 bg-white/[0.02] px-8 py-5">
          <h3 className="text-base font-bold text-white tracking-tight">Detailed Breakdown</h3>
        </div>
        <div className="overflow-x-auto p-4">
          <table className="w-full text-left text-sm border-collapse">
            <thead>
              <tr className="text-xs font-bold uppercase tracking-widest text-forge-muted">
                <th className="px-6 py-4 pb-6">Tag</th>
                <th className="px-6 py-4 pb-6">Attempted</th>
                <th className="px-6 py-4 pb-6">Solved</th>
                <th className="px-6 py-4 pb-6 w-1/3">Success Rate</th>
                <th className="px-6 py-4 pb-6">Status</th>
              </tr>
            </thead>
            <tbody className="space-y-2 relative">
              {sortedStats.map((stat, i) => {
                const isValid = stat.attempted >= MIN_ATTEMPTS_THRESHOLD;
                return (
                  <motion.tr
                    key={stat.tag}
                    custom={i}
                    variants={tableRowVariants}
                    initial="hidden"
                    animate="show"
                    className={`group transition-all duration-300 hover:bg-white/5 rounded-2xl ${
                      !isValid ? "opacity-50 hover:opacity-100" : ""
                    }`}
                  >
                    <td className="px-6 py-4 font-bold capitalize text-white first:rounded-l-2xl">
                      {stat.tag}
                    </td>
                    <td className="px-6 py-4 font-medium text-forge-muted group-hover:text-white/80 transition-colors">
                      {stat.attempted}
                    </td>
                    <td className="px-6 py-4 font-bold text-emerald-400">
                      {stat.solved}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-4">
                        <div className="h-2 flex-1 overflow-hidden rounded-full bg-black/40 border border-white/5">
                          <div
                            className="h-full rounded-full transition-all duration-1000 ease-out"
                            style={{
                              width: `${isValid ? stat.successRate : 0}%`,
                              background: !isValid
                                ? "#334155"
                                : stat.successRate >= 70
                                ? "linear-gradient(90deg, #34d399, #059669)"
                                : stat.successRate >= 40
                                ? "linear-gradient(90deg, #fbbf24, #d97706)"
                                : "linear-gradient(90deg, #f87171, #dc2626)",
                              boxShadow: isValid ? (stat.successRate >= 70 ? "0 0 10px rgba(52,211,153,0.5)" : stat.successRate >= 40 ? "0 0 10px rgba(251,191,36,0.5)" : "0 0 10px rgba(248,113,113,0.5)") : "none"
                            }}
                          />
                        </div>
                        <span className="w-12 text-right font-bold text-forge-muted group-hover:text-white transition-colors">
                          {isValid ? `${stat.successRate.toFixed(0)}%` : "—"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4 last:rounded-r-2xl">
                      <StatusBadge rate={stat.successRate} isValid={isValid} />
                    </td>
                  </motion.tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Threshold info */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="flex justify-center"
      >
        <p className="text-xs font-medium text-forge-muted/70 bg-black/20 px-4 py-2 rounded-xl border border-white/5">
          Tags with fewer than {MIN_ATTEMPTS_THRESHOLD} attempts are marked as
          "Insufficient Data" and excluded from weakness analysis.
        </p>
      </motion.div>
    </div>
  );
}
