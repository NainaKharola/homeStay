const jwt = require("jsonwebtoken");
const { validationResult } = require("express-validator");
const User = require("../models/User");

// Helper to generate JWT token
const generateToken = (user) => {
  const payload = {
    userId: user._id,
    email: user.email,
    role: user.role,
  };

  const secret = process.env.JWT_SECRET || "default_homestay_secret_key_2026";
  return jwt.sign(payload, secret, { expiresIn: "7d" });
};

// @desc    Register a new user
// @route   POST /api/auth/register
// @access  Public
const registerUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: errors.array()[0].msg,
        errors: errors.array(),
      });
    }

    const { name, email, password } = req.body;

    // Check duplicate email
    const existingUser = await User.findOne({ email: email.toLowerCase() });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Create user
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password,
    });

    const token = generateToken(user);
    const userJson = user.toJSON();

    res.status(201).json({
      message: "Registration successful",
      token,
      user: userJson,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Authenticate user & get token
// @route   POST /api/auth/login
// @access  Public
const loginUser = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: errors.array()[0].msg,
        errors: errors.array(),
      });
    }

    const { email, password } = req.body;

    // Find user and select password explicitly
    const user = await User.findOne({ email: email.toLowerCase() }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user);
    const userJson = user.toJSON();

    res.status(200).json({
      message: "Login successful",
      token,
      user: userJson,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get current authenticated user
// @route   GET /api/auth/me
// @access  Private
const getMe = async (req, res, next) => {
  try {
    res.status(200).json({
      user: req.user,
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Handle Google OAuth callback redirect
// @route   GET /api/auth/google/callback
// @access  Public
const googleAuthCallback = async (req, res, next) => {
  try {
    const clientUrl = process.env.CLIENT_URL || process.env.FRONTEND_URL || "http://localhost:5173";

    if (!req.user) {
      return res.redirect(`${clientUrl}/login?error=Google authentication failed`);
    }

    const token = generateToken(req.user);
    const userJson = req.user.toJSON ? req.user.toJSON() : req.user;

    const encodedUser = encodeURIComponent(JSON.stringify(userJson));
    res.redirect(`${clientUrl}?token=${token}&user=${encodedUser}`);
  } catch (error) {
    console.error("Google auth callback error:", error);
    next(error);
  }
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
  googleAuthCallback,
};
