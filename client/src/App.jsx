import { Outlet, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Sidebar from "./components/Sidebar";

export default function App() {
  const location = useLocation();

  return (
    <div className="flex min-h-screen bg-transparent relative">
      {/* Floating Sidebar Navigation */}
      <Sidebar />

      {/* Main Content Area — offset by sidebar width + gap */}
      <div className="flex-1 transition-all duration-300" style={{ marginLeft: "280px" }}>
        <main className="mx-auto max-w-6xl px-8 py-10 min-h-screen">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 16, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -16, filter: "blur(4px)" }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
