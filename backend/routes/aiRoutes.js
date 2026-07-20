const express = require("express");
const { generatePropertyDescription } = require("../controllers/aiController");
const { protect } = require("../middleware/authMiddleware");

const router = express.Router();

// @route   POST /api/ai/property-description
// @desc    Generate professional property description using Gemini AI
// @access  Private
router.post("/property-description", protect, generatePropertyDescription);

module.exports = router;
