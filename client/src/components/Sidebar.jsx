import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiGrid,
  FiBarChart2,
  FiTarget,
  FiZap,
} from "react-icons/fi";

const navItems = [
  { to: "/", icon: FiGrid, label: "Dashboard" },
  { to: "/analyzer", icon: FiBarChart2, label: "Tag Analyzer" },
  { to: "/recommendations", icon: FiTarget, label: "Recommendations" },
];

export default function Sidebar() {
  return (
    <motion.aside
      initial={{ x: -100, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed left-6 top-6 bottom-6 z-50 flex flex-col glass-card rounded-[2rem] border-white/5 bg-black/40 shadow-2xl"
      style={{ width: "260px" }}
    >
      {/* Logo */}
      <div className="flex items-center gap-4 px-8 py-10">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-forge-accent to-purple-500 glow-accent shadow-[0_0_20px_rgba(129,140,248,0.3)]">
          <FiZap className="h-6 w-6 text-white" />
        </div>
        <div>
          <h1 className="text-xl font-extrabold tracking-tight text-white gradient-text">
            AlgoForge
          </h1>
          <p className="text-[10px] font-bold text-forge-muted uppercase tracking-[0.2em] mt-1">
            Analyzer
          </p>
        </div>
      </div>

      {/* Nav Links */}
      <nav className="mt-4 flex flex-1 flex-col gap-3 px-5">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              `group relative flex items-center gap-4 rounded-2xl px-5 py-4 text-[15px] font-semibold transition-all duration-300 ${
                isActive
                  ? "text-white"
                  : "text-forge-muted hover:text-white"
              }`
            }
          >
            {({ isActive }) => (
              <>
                {/* Hover / Active Background */}
                {isActive && (
                  <motion.div
                    layoutId="sidebar-bg"
                    className="absolute inset-0 rounded-2xl bg-white/10 border border-white/10 shadow-lg"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <div className="absolute inset-0 rounded-2xl bg-white/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                
                <Icon
                  className={`relative z-10 h-[22px] w-[22px] transition-colors duration-300 ${
                    isActive ? "text-forge-accent-light" : "text-forge-muted group-hover:text-forge-accent-light"
                  }`}
                />
                <span className="relative z-10 tracking-wide">{label}</span>
                
                {isActive && (
                  <motion.div
                    layoutId="sidebar-indicator"
                    className="absolute left-0 top-1/2 -translate-y-1/2 h-8 w-1 rounded-r-full bg-forge-accent-light shadow-[0_0_12px_rgba(165,180,252,0.9)]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>
    </motion.aside>
  );
}
