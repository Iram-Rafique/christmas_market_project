const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
// const traderRoutes = require("./routes/traderRoutes");
const applicationRoutes = require("./routes/applicationRoutes");

const app = express();

// CORS: allow only the configured frontend origins.
// Set ALLOWED_ORIGINS in backend/.env, separated by commas.

const allowedOrigins = (process.env.ALLOWED_ORIGINS || "http://localhost:3000")
  .split(",")
  .map((origin) => origin.trim().replace(/\/$/, ""))
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // Requests without an Origin header (e.g. curl or server-to-server calls)
      // are not browser CORS requests, so they can proceed to normal route checks.
      if (!origin) return callback(null, true);

      const normalizedOrigin = origin.replace(/\/$/, "");
      if (allowedOrigins.includes(normalizedOrigin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
  })
);
app.use(express.json());

// Test route
app.get("/", (req, res) => {
  res.json({
    message: "Paisley Christmas Markets API is running",
  });
});

// Authentication routes
app.use("/api/auth", authRoutes);
// app.use("/api/traders", traderRoutes);
app.use("/api/applications", applicationRoutes);

// Return a predictable JSON response for unknown API routes.
app.use((req, res) => {
  return res.status(404).json({ message: "Endpoint not found." });
});

// Handle malformed JSON and CORS errors without exposing internal details.
app.use((error, req, res, next) => {
  if (res.headersSent) return next(error);

  if (error instanceof SyntaxError && error.status === 400 && "body" in error) {
    return res.status(400).json({ message: "Request body contains invalid JSON." });
  }

  if (error.message === "Not allowed by CORS") {
    return res.status(403).json({ message: "This origin is not allowed to access the API." });
  }

  console.error("Unhandled request error:", error.message);
  return res.status(500).json({ message: "An unexpected error occurred. Please try again." });
});

// connect to mongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");

    app.listen(process.env.PORT || 5000, () => {
      console.log(
        `Server running on port ${process.env.PORT || 5000}`
      );
    });
  })
  .catch((error) => {
    console.error("MongoDB connection failed:", error);
  });