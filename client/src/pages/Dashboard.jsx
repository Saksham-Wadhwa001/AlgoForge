import { useState } from "react";
import { motion } from "framer-motion";
import { FiSearch, FiActivity, FiCheckCircle, FiLayers } from "react-icons/fi";
import { SiCodeforces, SiLeetcode } from "react-icons/si";
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
        <h2 className="text-4xl font-extrabold tracking-tight text-white">Unified Dashboard</h2>
        <p className="text-base font-medium text-forge-muted">
          Connect your competitive programming handles to synchronize your progress.
        </p>
      </motion.div>

      {/* Handle Input Section - Redesigned for a more "filling" and premium look */}
      <motion.form
        onSubmit={handleAnalyze}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        className="glass-card rounded-[2rem] p-10 relative overflow-hidden max-w-4xl"
      >
        {/* Subtle decorative background glow */}
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-forge-accent/10 blur-[100px] pointer-events-none" />

        <div className="relative z-10 flex flex-col gap-6">
          <div className="mb-2">
            <h3 className="text-xl font-bold text-white tracking-tight">Sync Profiles</h3>
            <p className="text-sm text-forge-muted mt-1">Enter your platform handles below to aggregate your stats.</p>
          </div>

          {[
            { 
              key: "codeforces", 
              placeholder: "e.g., tourist", 
              label: "Codeforces", 
              color: "focus:border-blue-500 focus:ring-blue-500/20",
              icon: <SiCodeforces className="h-6 w-6 text-blue-400" />
            },
            { 
              key: "leetcode", 
              placeholder: "e.g., neal_wu", 
              label: "LeetCode", 
              color: "focus:border-amber-500 focus:ring-amber-500/20",
              icon: <SiLeetcode className="h-6 w-6 text-amber-400" />
            },
            { 
              key: "atcoder", 
              placeholder: "e.g., tourist", 
              label: "AtCoder", 
              color: "focus:border-emerald-500 focus:ring-emerald-500/20",
              icon: <div className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500 text-[10px] font-bold text-white">AC</div>
            },
          ].map(({ key, placeholder, label, color, icon }) => (
            <div key={key} className="group relative flex flex-col sm:flex-row sm:items-center gap-4 bg-black/20 p-4 rounded-2xl border border-white/5 transition-colors hover:bg-black/30">
              <div className="flex items-center gap-4 sm:w-48 shrink-0">
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-white/5 border border-white/10 shadow-sm">
                  {icon}
                </div>
                <label className="text-sm font-bold uppercase tracking-widest text-forge-muted group-focus-within:text-white transition-colors">
                  {label}
                </label>
              </div>
              
              <div className="relative flex-1">
                <input
                  type="text"
                  placeholder={placeholder}
                  value={handles[key]}
                  onChange={(e) =>
                    setHandles((prev) => ({ ...prev, [key]: e.target.value }))
                  }
                  className={`w-full rounded-xl border border-white/10 bg-black/40 px-6 py-4 text-base font-semibold text-white placeholder-white/20 transition-all duration-300 focus:outline-none focus:ring-4 focus:bg-black/60 hover:bg-black/50 ${color}`}
                />
              </div>
            </div>
          ))}
          
          <div className="mt-6 flex justify-end">
            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative flex items-center justify-center gap-3 overflow-hidden rounded-2xl bg-white text-black px-10 py-4 text-base font-bold shadow-[0_0_40px_rgba(255,255,255,0.15)] transition-all duration-300 hover:shadow-[0_0_60px_rgba(255,255,255,0.25)] sm:w-auto w-full"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-forge-accent via-purple-400 to-forge-accent opacity-0 transition-opacity duration-300 group-hover:opacity-20" />
              <FiSearch className="h-5 w-5 relative z-10" />
              <span className="relative z-10">Analyze Profiles</span>
            </motion.button>
          </div>
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
            className="grid gap-6 sm:grid-cols-3"
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
            <div className="mb-8 flex items-center gap-4">
              <h3 className="text-2xl font-bold tracking-tight text-white">
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
            className="glass-card relative overflow-hidden rounded-3xl p-8 border-forge-accent/20"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-forge-accent/10 to-transparent pointer-events-none" />
            <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center gap-6">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-forge-accent/20 border border-forge-accent/30 shadow-[0_0_30px_rgba(129,140,248,0.2)]">
                <FiActivity className="h-8 w-8 text-forge-accent-light" />
              </div>
              <div>
                <p className="text-xl font-bold text-white mb-2">
                  Growth Zone:{" "}
                  <span className="text-forge-accent-light bg-forge-accent/10 px-3 py-1 rounded-lg border border-forge-accent/20 drop-shadow-sm ml-2">
                    {user.growthZone.lower} – {user.growthZone.upper}
                  </span>
                </p>
                <p className="text-base font-medium text-forge-muted">
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
