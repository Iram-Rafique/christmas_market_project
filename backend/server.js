const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const authRoutes = require("./routes/authRoutes");
// const traderRoutes = require("./routes/traderRoutes");
const applicationRoutes = require("./routes/applicationRoutes");

const app = express();
// render sits behind a proxy. This lets the rate limiter
// see each visitor's real IP address instead of the proxy's.
app.set("trust proxy", 1);

// set ALLOWED_ORIGINS in backend/.env, separated by commas.

const allowedOrigins = (process.env.ALLOWED_ORIGINS || "http://localhost:3000")
  .split(",")
  .map((origin) => origin.trim().replace(/\/$/, ""))
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, callback) => {
      // requests without an Origin header (e.g. curl or server-to-server calls)
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
app.use(express.json({ limit: "20kb" }));

// test route
app.get("/", (req, res) => {
  res.json({
    message: "Paisley Christmas Markets API is running",
  });
});

// authentication routes
app.use("/api/auth", authRoutes);
// app.use("/api/traders", traderRoutes);
app.use("/api/applications", applicationRoutes);

//return a predictable JSON response for unknown API routes.
app.use((req, res) => {
  return res.status(404).json({ message: "Endpoint not found." });
});

// handle malformed JSON and CORS errors without exposing internal details.
app.use((error, req, res, next) => {
  if (res.headersSent) return next(error);

  if (error instanceof SyntaxError && error.status === 400 && "body" in error) {
    return res.status(400).json({ message: "Request body contains invalid JSON." });
  }

  if (error.type === "entity.too.large") {
    return res.status(413).json({ message: "Request is too large." });
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