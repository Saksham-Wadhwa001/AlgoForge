import { NavLink } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiGrid,
  FiBarChart2,
  FiTarget,
  FiGithub,
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
      className="fixed left-6 top-6 bottom-6 z-50 flex flex-col glass-card rounded-3xl"
      style={{ width: "240px" }}
    >
      {/* Logo */}
      <div className="flex items-center gap-3 px-6 py-8">
        <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-gradient-to-br from-forge-accent to-purple-500 glow-accent shadow-lg shadow-forge-accent/20">
          <FiZap className="h-5 w-5 text-white" />
        </div>
        <div>
          <h1 className="text-lg font-bold tracking-tight text-white gradient-text">
            AlgoForge
          </h1>
          <p className="text-xs font-medium text-forge-muted uppercase tracking-wider mt-0.5">CP Analyzer</p>
        </div>
      </div>

      {/* Nav Links */}
      <nav className="mt-4 flex flex-1 flex-col gap-2 px-4">
        {navItems.map(({ to, icon: Icon, label }) => (
          <NavLink
            key={to}
            to={to}
            end={to === "/"}
            className={({ isActive }) =>
              `group relative flex items-center gap-3 rounded-2xl px-4 py-3.5 text-sm font-medium transition-all duration-300 ${
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
                    className="absolute inset-0 rounded-2xl bg-white/5 border border-white/10 shadow-sm"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
                <div className="absolute inset-0 rounded-2xl bg-white/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                
                <Icon
                  className={`relative z-10 h-5 w-5 transition-colors duration-300 ${
                    isActive ? "text-forge-accent-light" : "text-forge-muted group-hover:text-forge-accent-light"
                  }`}
                />
                <span className="relative z-10">{label}</span>
                
                {isActive && (
                  <motion.div
                    layoutId="sidebar-indicator"
                    className="relative z-10 ml-auto h-1.5 w-1.5 rounded-full bg-forge-accent-light shadow-[0_0_8px_rgba(165,180,252,0.8)]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </>
            )}
          </NavLink>
        ))}
      </nav>

      {/* Footer */}
      <div className="p-4">
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="group flex items-center justify-center gap-2 rounded-2xl bg-white/5 border border-white/5 px-4 py-3 text-xs font-medium text-forge-muted transition-all duration-300 hover:bg-white/10 hover:text-white hover:border-white/10"
        >
          <FiGithub className="h-4 w-4 transition-transform duration-300 group-hover:scale-110" />
          <span>Star on GitHub</span>
        </a>
      </div>
    </motion.aside>
  );
}
