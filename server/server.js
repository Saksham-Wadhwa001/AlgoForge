import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import platformRoutes from "./routes/platforms.js";
import analyzeRoutes from "./routes/analyze.js";
import recommendationRoutes from "./routes/recommendations.js";

// ── Load Environment Variables ──
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// ── Middleware ──
app.use(
  cors({
    origin: ["http://localhost:5173", "http://localhost:3000"],
    credentials: true,
  })
);
app.use(express.json());

// ── Routes ──
app.use("/api/platforms", platformRoutes);
app.use("/api/analyze", analyzeRoutes);
app.use("/api/recommendations", recommendationRoutes);

// Health check
app.get("/api/health", (req, res) => {
  res.json({
    status: "ok",
    service: "AlgoForge API",
    timestamp: new Date().toISOString(),
  });
});

// ── 404 handler ──
app.use((req, res) => {
  res.status(404).json({ success: false, error: "Route not found" });
});

// ── Global error handler ──
app.use((err, req, res, next) => {
  console.error("Unhandled Error:", err.stack);
  res.status(500).json({ success: false, error: "Internal server error" });
});

// ── Server Start ──
app.listen(PORT, () => {
  console.log(`🚀 AlgoForge server running on http://localhost:${PORT}`);
  console.log(`📊 Health check: http://localhost:${PORT}/api/health`);
  console.log(`📡 Endpoints:`);
  console.log(`   GET  /api/platforms/codeforces/:handle`);
  console.log(`   GET  /api/platforms/leetcode/:handle`);
  console.log(`   GET  /api/platforms/atcoder/:handle`);
  console.log(`   POST /api/platforms/all`);
  console.log(`   POST /api/analyze`);
  console.log(`   POST /api/recommendations`);
});
