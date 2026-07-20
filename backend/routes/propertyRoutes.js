const express = require("express");

const router = express.Router();

const {
  getAllProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
  searchProperties,
} = require("../controllers/propertyController");
const { protect } = require("../middleware/authMiddleware");

// Search
router.get("/search", searchProperties);

// Get all
router.get("/", getAllProperties);

// Get single
router.get("/:id", getPropertyById);

// Create (Protected)
router.post("/", protect, createProperty);

// Update (Protected)
router.put("/:id", protect, updateProperty);

// Delete (Protected)
router.delete("/:id", protect, deleteProperty);

module.exports = router;