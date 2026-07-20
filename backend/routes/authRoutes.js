const express = require("express");
const { body } = require("express-validator");
const rateLimit = require("express-rate-limit");
const passport = require("passport");
const {
  registerUser,
  loginUser,
  getMe,
  googleAuthCallback,
} = require("../controllers/authController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// Rate limiter for auth endpoints: 5 requests per 15 minutes
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 requests per windowMs
  statusCode: 429,
  message: {
    message: "Too many authentication requests from this IP, please try again after 15 minutes.",
  },
  standardHeaders: true,
  legacyHeaders: false,
});

// Validation rules
const registerValidation = [
  body("name").trim().notEmpty().withMessage("Name is required"),
  body("email").trim().isEmail().withMessage("Please enter a valid email address"),
  body("password")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters long"),
];

const loginValidation = [
  body("email").trim().isEmail().withMessage("Please enter a valid email address"),
  body("password").notEmpty().withMessage("Password is required"),
];

// Routes
router.post("/register", authLimiter, registerValidation, registerUser);
router.post("/login", authLimiter, loginValidation, loginUser);
router.get("/me", protect, getMe);

// Google OAuth Routes
router.get(
  "/google",
  (req, res, next) => {
    if (!process.env.GOOGLE_CLIENT_ID || process.env.GOOGLE_CLIENT_ID === "your_google_client_id") {
      return res.status(400).json({
        message: "Google OAuth is not configured in backend .env file",
      });
    }
    passport.authenticate("google", { scope: ["profile", "email"], session: false })(req, res, next);
  }
);

router.get(
  "/google/callback",
  passport.authenticate("google", { session: false, failureRedirect: "/login" }),
  googleAuthCallback
);

module.exports = router;
