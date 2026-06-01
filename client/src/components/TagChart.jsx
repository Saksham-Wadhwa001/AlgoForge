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

function getBarColor(rate, isValid) {
  if (!isValid) return "#334155"; // muted for insufficient data
  if (rate >= 70) return "#22c55e";
  if (rate >= 40) return "#eab308";
  return "#ef4444";
}

function CustomTooltip({ active, payload }) {
  if (!active || !payload?.length) return null;
  const d = payload[0].payload;
  const isValid = d.attempted >= MIN_ATTEMPTS_THRESHOLD;

  return (
    <div className="glass-card rounded-xl px-4 py-3 shadow-2xl">
      <p className="mb-1 text-sm font-semibold capitalize text-white">
        {d.tag}
      </p>
      <div className="space-y-0.5 text-xs">
        <p className="text-forge-muted">
          Solved: <span className="text-forge-success">{d.solved}</span> / {d.attempted}
        </p>
        <p className="text-forge-muted">
          Success Rate:{" "}
          <span
            className={
              !isValid
                ? "text-forge-muted"
                : d.successRate >= 70
                ? "text-forge-success"
                : d.successRate >= 40
                ? "text-forge-warning"
                : "text-forge-danger"
            }
          >
            {isValid ? `${d.successRate.toFixed(1)}%` : "N/A"}
          </span>
        </p>
        {!isValid && (
          <p className="mt-1 text-forge-muted italic">
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
      transition={{ duration: 0.6, delay: 0.2 }}
      className="glass-card rounded-2xl p-6"
    >
      <div className="mb-6 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">
          Tag Success Rates
        </h3>
        <div className="flex items-center gap-4 text-xs text-forge-muted">
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-forge-success" /> ≥70%
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-forge-warning" /> ≥40%
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2 w-2 rounded-full bg-forge-danger" /> &lt;40%
          </span>
        </div>
      </div>

      <ResponsiveContainer width="100%" height={340}>
        <BarChart
          data={sortedData}
          margin={{ top: 5, right: 10, left: -10, bottom: 5 }}
          barCategoryGap="20%"
        >
          <CartesianGrid
            strokeDasharray="3 3"
            stroke="rgba(42, 42, 62, 0.6)"
            vertical={false}
          />
          <XAxis
            dataKey="tag"
            tick={{ fill: "#64748b", fontSize: 11 }}
            axisLine={{ stroke: "#2a2a3e" }}
            tickLine={false}
            angle={-30}
            textAnchor="end"
            height={70}
          />
          <YAxis
            domain={[0, 100]}
            tick={{ fill: "#64748b", fontSize: 11 }}
            axisLine={{ stroke: "#2a2a3e" }}
            tickLine={false}
            tickFormatter={(v) => `${v}%`}
          />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(99, 102, 241, 0.05)" }} />
          <Bar dataKey="successRate" radius={[6, 6, 0, 0]} maxBarSize={40}>
            {sortedData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={getBarColor(
                  entry.successRate,
                  entry.attempted >= MIN_ATTEMPTS_THRESHOLD
                )}
                fillOpacity={entry.attempted >= MIN_ATTEMPTS_THRESHOLD ? 0.85 : 0.3}
              />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </motion.div>
  );
}
