import { NavLink } from "react-router-dom";
import { FiGrid, FiTarget } from "react-icons/fi";
import { TbWaveSine } from "react-icons/tb";

const navItems = [
  { to: "/", label: "Dashboard", icon: FiGrid },
  { to: "/analyzer", label: "Weakness Analyzer", icon: TbWaveSine },
  { to: "/recommendations", label: "Recommendations", icon: FiTarget },
];

export default function Sidebar() {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-badge">&lt;/&gt;</div>
        <div>
          <p className="brand-title">AlgoForge</p>
          <p className="brand-subtitle">Competitive Programming Studio</p>
        </div>
      </div>

      <nav className="nav-list">
        {navItems.map(({ to, label, icon: Icon }) => (
          <NavLink key={to} to={to} end={to === "/"} className={({ isActive }) => `nav-item ${isActive ? "active" : ""}`}>
            <Icon className="nav-icon" />
            <span>{label}</span>
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <p className="tiny">Weekly focus</p>
        <p>Bitmasking + Graphs</p>
      </div>
    </aside>
  );
}
