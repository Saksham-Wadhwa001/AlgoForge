import { motion } from "framer-motion";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts";
import { MIN_ATTEMPTS_THRESHOLD } from "../data/fakeData";

// Define gradients in a defs object later, use url(#colorId) for fill
function getBarColorId(rate, isValid) {
  if (!isValid) return "colorMuted";
  if (rate >= 70) return "colorSuccess";
  if (rate >= 40) return "colorWarning";
  return "colorDanger";
}

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  const isValid = d.attempted >= MIN_ATTEMPTS_THRESHOLD;

  return (
    <div className="glass-card rounded-2xl px-5 py-4 shadow-2xl border-white/10 backdrop-blur-3xl bg-black/40">
      <p className="mb-2 text-base font-bold capitalize text-white tracking-tight">
        {d.tag}
      </p>
      <div className="space-y-1.5 text-sm font-medium">
        <p className="text-forge-muted flex justify-between gap-4">
          <span>Solved</span>
          <span className="text-white"><span className="text-emerald-400">{d.solved}</span> / {d.attempted}</span>
        </p>
        <p className="text-forge-muted flex justify-between gap-4">
          <span>Success Rate</span>
          <span
            className={
              !isValid
                ? "text-forge-muted"
                : d.successRate >= 70
                ? "text-emerald-400 drop-shadow-sm"
                : d.successRate >= 40
                ? "text-amber-400 drop-shadow-sm"
                : "text-red-400 drop-shadow-sm"
            }
          >
            {isValid ? `${d.successRate.toFixed(1)}%` : "N/A"}
          </span>
        </p>
        {!isValid && (
          <p className="mt-2 text-xs text-forge-muted/70 italic border-t border-white/10 pt-2">
            Min {MIN_ATTEMPTS_THRESHOLD} attempts required
          </p>
        )}
      </div>
    </div>
  );
}

export default function TagChart({ tagStats }) {
  const sortedData = [...tagStats].sort((a, b) => a.successRate - b.successRate);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="glass-card rounded-3xl p-8 border-white/5 relative overflow-hidden"
    >
      <div className="mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 relative z-10">
        <h3 className="text-xl font-bold tracking-tight text-white">
          Tag Success Rates
        </h3>
        <div className="flex flex-wrap items-center gap-4 text-xs font-bold tracking-wider uppercase text-forge-muted bg-black/20 px-4 py-2 rounded-xl border border-white/5">
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" /> ≥70%
          </span>
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.8)]" /> ≥40%
          </span>
          <span className="flex items-center gap-2">
            <span className="h-2 w-2 rounded-full bg-red-400 shadow-[0_0_8px_rgba(248,113,113,0.8)]" /> &lt;40%
          </span>
        </div>
      </div>

      <div className="relative z-10">
        <ResponsiveContainer width="100%" height={380}>
          <BarChart
            data={sortedData}
            margin={{ top: 10, right: 10, left: -20, bottom: 5 }}
            barCategoryGap="25%"
          >
            <defs>
              <linearGradient id="colorSuccess" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#34d399" stopOpacity={0.9}/>
                <stop offset="95%" stopColor="#059669" stopOpacity={0.6}/>
              </linearGradient>
              <linearGradient id="colorWarning" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#fbbf24" stopOpacity={0.9}/>
                <stop offset="95%" stopColor="#d97706" stopOpacity={0.6}/>
              </linearGradient>
              <linearGradient id="colorDanger" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#f87171" stopOpacity={0.9}/>
                <stop offset="95%" stopColor="#dc2626" stopOpacity={0.6}/>
              </linearGradient>
              <linearGradient id="colorMuted" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#475569" stopOpacity={0.5}/>
                <stop offset="95%" stopColor="#334155" stopOpacity={0.2}/>
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="4 4"
              stroke="rgba(255, 255, 255, 0.05)"
              vertical={false}
            />
            <XAxis
              dataKey="tag"
              tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 500 }}
              axisLine={{ stroke: "rgba(255, 255, 255, 0.1)" }}
              tickLine={false}
              angle={-35}
              textAnchor="end"
              height={80}
              dy={10}
            />
            <YAxis
              domain={[0, 100]}
              tick={{ fill: "#94a3b8", fontSize: 12, fontWeight: 500 }}
              axisLine={{ stroke: "rgba(255, 255, 255, 0.1)" }}
              tickLine={false}
              tickFormatter={(v) => `${v}%`}
              dx={-10}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255, 255, 255, 0.02)" }} />
            <Bar dataKey="successRate" radius={[8, 8, 0, 0]} maxBarSize={48}>
              {sortedData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={`url(#${getBarColorId(
                    entry.successRate,
                    entry.attempted >= MIN_ATTEMPTS_THRESHOLD
                  )})`}
                  stroke="rgba(255,255,255,0.1)"
                  strokeWidth={1}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
