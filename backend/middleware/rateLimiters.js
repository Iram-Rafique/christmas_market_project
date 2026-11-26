const { rateLimit } = require("express-rate-limit");

// limits are counted per IP address and kept in memory
// a single server instance such as the Render web service.

// public application form: stops one visitor flooding the database.
const applicationLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  limit: 5, // 5 applications per IP per hour
  standardHeaders: "draft-7",
  legacyHeaders: false,
  message: {
    message:
      "Too many applications have been sent from this connection. Please try again in an hour.",
  },
});

// administrator login: slows down password-guessing attacks.
const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 10, // 10 attempts per IP per 15 minutes
  standardHeaders: "draft-7",
  legacyHeaders: false,
  skipSuccessfulRequests: true, // only failed logins count
  message: {
    message: "Too many login attempts. Please try again in 15 minutes.",
  },
});

module.exports = { applicationLimiter, loginLimiter };