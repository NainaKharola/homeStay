const { buildPropertyPrompt } = require("../utils/promptBuilder");
const { generateDescriptionFromGemini } = require("../services/geminiService");

// @desc    Generate AI property description using Gemini API
// @route   POST /api/ai/property-description
// @access  Private / Public
const generatePropertyDescription = async (req, res, next) => {
  try {
    const { title, location } = req.body || {};

    if (!title || typeof title !== "string" || !title.trim()) {
      return res.status(400).json({
        success: false,
        message: "Property title is required to generate a description.",
      });
    }

    if (!location || typeof location !== "string" || !location.trim()) {
      return res.status(400).json({
        success: false,
        message: "Property location is required to generate a description.",
      });
    }

    const prompt = buildPropertyPrompt(req.body);
    const description = await generateDescriptionFromGemini(prompt);

    return res.status(200).json({
      success: true,
      description,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  generatePropertyDescription,
};
