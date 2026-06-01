import { motion } from "framer-motion";

export default function StatsCard({ icon: Icon, label, value, sub, color = "text-forge-accent-light", delay = 0 }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] }}
      whileHover={{ y: -6, scale: 1.02 }}
      className="glass-card group relative overflow-hidden rounded-3xl p-6 transition-all duration-300 hover:border-white/15"
    >
      {/* Background Icon (Decorative) */}
      {Icon && (
        <Icon 
          className="absolute -right-4 -bottom-4 h-32 w-32 opacity-[0.03] transition-transform duration-500 group-hover:scale-110 group-hover:opacity-[0.05]" 
        />
      )}

      {/* Hover glow effect */}
      <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative z-10">
        <div className="mb-4 flex items-center gap-3">
          <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-white/5 border border-white/5 shadow-sm">
            {Icon && <Icon className={`h-4 w-4 ${color}`} />}
          </div>
          <span className="text-xs font-semibold uppercase tracking-widest text-forge-muted">
            {label}
          </span>
        </div>
        <div className="flex items-baseline gap-2">
          <p className={`text-4xl font-extrabold tracking-tight ${color} drop-shadow-sm`}>
            {value}
          </p>
        </div>
        {sub && (
          <p className="mt-2 text-xs font-medium text-forge-muted/80">{sub}</p>
        )}
      </div>
    </motion.div>
  );
}
