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

// Search
router.get("/search", searchProperties);

// Get all
router.get("/", getAllProperties);

// Get single
router.get("/:id", getPropertyById);

// Create
router.post("/", createProperty);

// Update
router.put("/:id", updateProperty);

// Delete
router.delete("/:id", deleteProperty);

module.exports = router;