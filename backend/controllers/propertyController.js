const mongoose = require("mongoose");
const Property = require("../models/Property");

const requiredFields = [
  "id",
  "title",
  "location",
  "price",
  "rating",
  "image",
  "description",
];

const isEmptyText = (value) =>
  typeof value !== "string" || value.trim().length === 0;

const isNumeric = (value) => value !== "" && Number.isFinite(Number(value));

const hasAllRequiredFields = (body) =>
  requiredFields.every(
    (field) => body[field] !== undefined && body[field] !== null
  );

const hasInvalidPropertyFields = (body) => {
  if (body.title !== undefined && isEmptyText(body.title)) return true;
  if (body.location !== undefined && isEmptyText(body.location)) return true;
  if (body.image !== undefined && isEmptyText(body.image)) return true;
  if (body.description !== undefined && isEmptyText(body.description))
    return true;
  if (body.price !== undefined && !isNumeric(body.price)) return true;
  if (body.rating !== undefined && !isNumeric(body.rating)) return true;
  if (body.id !== undefined && !isNumeric(body.id)) return true;

  return false;
};

const isValidPropertyId = (id) => mongoose.Types.ObjectId.isValid(id);



// ===================== GET ALL =====================

const getAllProperties = async (req, res, next) => {
  try {
    const properties = await Property.find();

    res.status(200).json(properties);
  } catch (error) {
    next(error);
  }
};



// ===================== GET SINGLE =====================

const getPropertyById = async (req, res, next) => {
  try {
    if (!isValidPropertyId(req.params.id)) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    res.status(200).json(property);
  } catch (error) {
    next(error);
  }
};



// ===================== CREATE =====================

const createProperty = async (req, res, next) => {
  try {
    const body = req.body || {};

    if (!hasAllRequiredFields(body)) {
      return res.status(400).json({
        message: "All fields are required",
      });
    }

    if (hasInvalidPropertyFields(body)) {
      return res.status(400).json({
        message: "Invalid property data",
      });
    }

    const newProperty = await Property.create({
      id: Number(body.id),
      title: body.title.trim(),
      location: body.location.trim(),
      price: Number(body.price),
      rating: Number(body.rating),
      image: body.image.trim(),
      description: body.description.trim(),
    });

    res.status(201).json(newProperty);
  } catch (error) {
    next(error);
  }
};



// ===================== UPDATE =====================

const updateProperty = async (req, res, next) => {
  try {
    const body = req.body || {};

    if (!isValidPropertyId(req.params.id)) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    if (hasInvalidPropertyFields(body)) {
      return res.status(400).json({
        message: "Invalid property data",
      });
    }

    // Update only editable fields
    if (body.title !== undefined)
      property.title = body.title.trim();

    if (body.location !== undefined)
      property.location = body.location.trim();

    if (body.price !== undefined)
      property.price = Number(body.price);

    if (body.rating !== undefined)
      property.rating = Number(body.rating);

    if (body.image !== undefined)
      property.image = body.image.trim();

    if (body.description !== undefined)
      property.description = body.description.trim();

    // Optional: allow updating custom numeric id
    if (body.id !== undefined)
      property.id = Number(body.id);

    await property.save();

    res.status(200).json(property);
  } catch (error) {
    console.error(error);
    next(error);
  }
};



// ===================== DELETE =====================

const deleteProperty = async (req, res, next) => {
  try {
    if (!isValidPropertyId(req.params.id)) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    const property = await Property.findById(req.params.id);

    if (!property) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    await property.deleteOne();

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};



// ===================== SEARCH =====================

const searchProperties = async (req, res, next) => {
  try {
    const query = req.query.q || "";

    const result = await Property.find({
      $or: [
        {
          title: {
            $regex: query,
            $options: "i",
          },
        },
        {
          location: {
            $regex: query,
            $options: "i",
          },
        },
      ],
    });

    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllProperties,
  getPropertyById,
  createProperty,
  updateProperty,
  deleteProperty,
  searchProperties,
};