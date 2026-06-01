import { motion } from "framer-motion";
import { FiActivity, FiAlertTriangle, FiCheckCircle } from "react-icons/fi";
import TagChart from "../components/TagChart";
import { FAKE_TAG_STATS, FAKE_USER, MIN_ATTEMPTS_THRESHOLD } from "../data/fakeData";

function StatusBadge({ rate, isValid }) {
  if (!isValid) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-forge-border/50 px-2.5 py-0.5 text-[10px] font-medium text-forge-muted">
        Insufficient Data
      </span>
    );
  }
  if (rate >= 70) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-forge-success/15 px-2.5 py-0.5 text-[10px] font-medium text-forge-success">
        <FiCheckCircle className="h-2.5 w-2.5" /> Strong
      </span>
    );
  }
  if (rate >= 40) {
    return (
      <span className="inline-flex items-center gap-1 rounded-full bg-forge-warning/15 px-2.5 py-0.5 text-[10px] font-medium text-forge-warning">
        <FiAlertTriangle className="h-2.5 w-2.5" /> Moderate
      </span>
    );
  }
  return (
    <span className="inline-flex items-center gap-1 rounded-full bg-forge-danger/15 px-2.5 py-0.5 text-[10px] font-medium text-forge-danger">
      <FiAlertTriangle className="h-2.5 w-2.5" /> Weak
    </span>
  );
}

const tableRowVariants = {
  hidden: { opacity: 0, x: -10 },
  show: (i) => ({
    opacity: 1,
    x: 0,
    transition: { duration: 0.3, delay: i * 0.05 },
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
    <div className="space-y-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <h2 className="text-2xl font-bold text-white">Tag Weakness Analyzer</h2>
        <p className="mt-1 text-sm text-forge-muted">
          Analyzing submissions in your Growth Zone ({user.growthZone.lower}–
          {user.growthZone.upper}) from the last 6 months.
        </p>
      </motion.div>

      {/* Weakest tag banner */}
      {weakestValid && (
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="flex items-center gap-4 rounded-2xl border border-forge-danger/30 bg-forge-danger/5 p-5"
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-forge-danger/15">
            <FiAlertTriangle className="h-6 w-6 text-forge-danger" />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">
              Weakest Area:{" "}
              <span className="capitalize text-forge-danger">
                {weakestValid.tag}
              </span>
            </p>
            <p className="text-xs text-forge-muted">
              {weakestValid.successRate.toFixed(1)}% success rate with{" "}
              {weakestValid.attempted} problems attempted. Focus here to level
              up fastest.
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
        transition={{ duration: 0.5, delay: 0.4 }}
        className="glass-card overflow-hidden rounded-2xl"
      >
        <div className="border-b border-forge-border px-6 py-4">
          <h3 className="text-sm font-semibold text-white">Detailed Breakdown</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-forge-border text-xs uppercase tracking-wider text-forge-muted">
                <th className="px-6 py-3 font-medium">Tag</th>
                <th className="px-6 py-3 font-medium">Attempted</th>
                <th className="px-6 py-3 font-medium">Solved</th>
                <th className="px-6 py-3 font-medium">Success Rate</th>
                <th className="px-6 py-3 font-medium">Status</th>
              </tr>
            </thead>
            <tbody>
              {sortedStats.map((stat, i) => {
                const isValid = stat.attempted >= MIN_ATTEMPTS_THRESHOLD;
                return (
                  <motion.tr
                    key={stat.tag}
                    custom={i}
                    variants={tableRowVariants}
                    initial="hidden"
                    animate="show"
                    className={`border-b border-forge-border/50 transition-colors hover:bg-forge-card/50 ${
                      !isValid ? "opacity-50" : ""
                    }`}
                  >
                    <td className="px-6 py-3.5 font-medium capitalize text-white">
                      {stat.tag}
                    </td>
                    <td className="px-6 py-3.5 text-forge-muted">
                      {stat.attempted}
                    </td>
                    <td className="px-6 py-3.5 text-forge-success">
                      {stat.solved}
                    </td>
                    <td className="px-6 py-3.5">
                      <div className="flex items-center gap-2">
                        <div className="h-1.5 w-16 overflow-hidden rounded-full bg-forge-border">
                          <div
                            className="h-full rounded-full transition-all duration-700"
                            style={{
                              width: `${isValid ? stat.successRate : 0}%`,
                              backgroundColor: !isValid
                                ? "#334155"
                                : stat.successRate >= 70
                                ? "#22c55e"
                                : stat.successRate >= 40
                                ? "#eab308"
                                : "#ef4444",
                            }}
                          />
                        </div>
                        <span className="text-forge-muted">
                          {isValid ? `${stat.successRate.toFixed(1)}%` : "—"}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-3.5">
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
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="text-center text-xs text-forge-muted"
      >
        Tags with fewer than {MIN_ATTEMPTS_THRESHOLD} attempts are marked as
        "Insufficient Data" and excluded from weakness analysis.
      </motion.p>
    </div>
  );
}
