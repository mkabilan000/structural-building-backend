require("dotenv").config();
const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const connectDB = require("./config/db");

const buildingRoutes = require("./routes/buildingRoutes");
const componentRoutes = require("./routes/componentRoutes");

// ── Connect to MongoDB ─────────────────────────────────────────────────────────
connectDB();

const app = express();

// ── Middleware ─────────────────────────────────────────────────────────────────
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}

// ── Health Check ───────────────────────────────────────────────────────────────
app.get("/api/health", (req, res) => {
  res.json({
    success: true,
    message: "Structural Element Knowledge Explorer API is running 🏗️",
    timestamp: new Date().toISOString(),
  });
});

// ── Routes ─────────────────────────────────────────────────────────────────────
app.use("/api/buildings", buildingRoutes);
app.use("/api/components", componentRoutes);

// ── 404 Handler ────────────────────────────────────────────────────────────────
app.use((req, res) => {
  res.status(404).json({ success: false, message: `Route ${req.originalUrl} not found` });
});

// ── Global Error Handler ───────────────────────────────────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({
    success: false,
    message: err.message || "Internal Server Error",
  });
});

// ── Start Server ───────────────────────────────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀  Server running on http://localhost:${PORT}`);
  console.log(`📌  Environment: ${process.env.NODE_ENV || "development"}`);
});
