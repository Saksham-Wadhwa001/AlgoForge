import { useState } from "react";
import { motion } from "framer-motion";
import { FiSearch, FiActivity, FiCheckCircle, FiLayers } from "react-icons/fi";
import PlatformCard from "../components/PlatformCard";
import StatsCard from "../components/StatsCard";
import { FAKE_USER } from "../data/fakeData";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

export default function Dashboard() {
  const [handles, setHandles] = useState({
    codeforces: "",
    leetcode: "",
    atcoder: "",
  });
  const [analyzed, setAnalyzed] = useState(false);
  const user = FAKE_USER;

  const handleAnalyze = (e) => {
    e.preventDefault();
    // In production, this would call the backend
    setAnalyzed(true);
  };

  return (
    <div className="space-y-10">
      {/* Page Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col gap-2"
      >
        <h2 className="text-3xl font-extrabold tracking-tight text-white">Unified Dashboard</h2>
        <p className="text-sm font-medium text-forge-muted">
          Connect your competitive programming handles to synchronize your progress.
        </p>
      </motion.div>

      {/* Handle Input Section */}
      <motion.form
        onSubmit={handleAnalyze}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="glass-card rounded-3xl p-8 relative overflow-hidden"
      >
        {/* Subtle decorative background glow */}
        <div className="absolute -top-24 -right-24 h-64 w-64 rounded-full bg-forge-accent/10 blur-[80px] pointer-events-none" />

        <div className="grid gap-6 md:grid-cols-3 relative z-10">
          {[
            { key: "codeforces", placeholder: "tourist", label: "Codeforces", color: "focus:border-blue-500 focus:ring-blue-500/20" },
            { key: "leetcode", placeholder: "neal_wu", label: "LeetCode", color: "focus:border-amber-500 focus:ring-amber-500/20" },
            { key: "atcoder", placeholder: "tourist", label: "AtCoder", color: "focus:border-emerald-500 focus:ring-emerald-500/20" },
          ].map(({ key, placeholder, label, color }) => (
            <div key={key} className="relative group">
              <label className="mb-2 block text-xs font-bold uppercase tracking-widest text-forge-muted group-focus-within:text-white transition-colors">
                {label}
              </label>
              <div className="relative">
                <input
                  type="text"
                  placeholder={placeholder}
                  value={handles[key]}
                  onChange={(e) =>
                    setHandles((prev) => ({ ...prev, [key]: e.target.value }))
                  }
                  className={`w-full rounded-2xl border border-white/10 bg-black/20 px-5 py-3.5 text-sm font-medium text-white placeholder-white/20 transition-all duration-300 focus:outline-none focus:ring-4 focus:bg-black/40 hover:bg-black/30 ${color}`}
                />
              </div>
            </div>
          ))}
        </div>
        <div className="mt-8 flex justify-end relative z-10">
          <motion.button
            type="submit"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="group relative flex items-center gap-3 overflow-hidden rounded-2xl bg-white text-black px-8 py-3.5 text-sm font-bold shadow-[0_0_40px_rgba(255,255,255,0.1)] transition-all duration-300 hover:shadow-[0_0_60px_rgba(255,255,255,0.2)]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-forge-accent via-purple-400 to-forge-accent opacity-0 transition-opacity duration-300 group-hover:opacity-20" />
            <FiSearch className="h-4 w-4 relative z-10" />
            <span className="relative z-10">Analyze Profiles</span>
          </motion.button>
        </div>
      </motion.form>

      {/* Results */}
      {analyzed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="space-y-10"
        >
          {/* Overall Stats */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid gap-5 sm:grid-cols-3"
          >
            <StatsCard
              icon={FiCheckCircle}
              label="Total Solved"
              value={user.totalSolved}
              sub="Across all platforms"
              color="text-emerald-400"
              delay={0}
            />
            <StatsCard
              icon={FiActivity}
              label="Avg Rating"
              value={Math.round(
                (user.platforms.codeforces.currentRating +
                  user.platforms.leetcode.currentRating +
                  user.platforms.atcoder.currentRating) /
                  3
              )}
              sub="Cross-platform average"
              color="text-forge-accent-light"
              delay={0.1}
            />
            <StatsCard
              icon={FiLayers}
              label="Active Platforms"
              value="3 / 3"
              sub="All handles connected"
              color="text-amber-400"
              delay={0.2}
            />
          </motion.div>

          {/* Platform Cards */}
          <div>
            <div className="mb-6 flex items-center gap-3">
              <h3 className="text-xl font-bold tracking-tight text-white">
                Platform Breakdown
              </h3>
              <div className="h-px flex-1 bg-gradient-to-r from-white/10 to-transparent" />
            </div>
            <div className="grid gap-6 md:grid-cols-3">
              {Object.entries(user.platforms).map(
                ([platform, data], idx) => (
                  <PlatformCard
                    key={platform}
                    platform={platform}
                    data={data}
                    delay={0.1 + idx * 0.15}
                  />
                )
              )}
            </div>
          </div>

          {/* Growth Zone */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
            className="glass-card relative overflow-hidden rounded-3xl p-6 border-forge-accent/20"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-forge-accent/10 to-transparent pointer-events-none" />
            <div className="relative z-10 flex items-center gap-5">
              <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-forge-accent/20 border border-forge-accent/30 shadow-[0_0_30px_rgba(129,140,248,0.2)]">
                <FiActivity className="h-6 w-6 text-forge-accent-light" />
              </div>
              <div>
                <p className="text-base font-bold text-white mb-1">
                  Growth Zone:{" "}
                  <span className="text-forge-accent-light bg-forge-accent/10 px-2 py-0.5 rounded-md border border-forge-accent/20">
                    {user.growthZone.lower} – {user.growthZone.upper}
                  </span>
                </p>
                <p className="text-sm font-medium text-forge-muted">
                  Problems in this rating range will accelerate your improvement the fastest.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
}
