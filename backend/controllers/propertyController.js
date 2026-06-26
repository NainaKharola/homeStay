const properties = require("../data/properties");

const requiredFields = [
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
  requiredFields.every((field) => body[field] !== undefined && body[field] !== null);

const hasInvalidPropertyFields = (body) => {
  if (body.title !== undefined && isEmptyText(body.title)) return true;
  if (body.location !== undefined && isEmptyText(body.location)) return true;
  if (body.image !== undefined && isEmptyText(body.image)) return true;
  if (body.description !== undefined && isEmptyText(body.description)) return true;
  if (body.price !== undefined && !isNumeric(body.price)) return true;
  if (body.rating !== undefined && !isNumeric(body.rating)) return true;

  return false;
};

const getNextPropertyId = () =>
  properties.length === 0 ? 1 : Math.max(...properties.map((property) => property.id)) + 1;

// GET ALL
const getAllProperties = (req, res, next) => {
  try {
    res.status(200).json(properties);
  } catch (error) {
    next(error);
  }
};

// GET SINGLE
const getPropertyById = (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);

    const property = properties.find((p) => p.id === id);

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

// CREATE
const createProperty = (req, res, next) => {
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

    const newProperty = {
      id: getNextPropertyId(),
      title: body.title.trim(),
      location: body.location.trim(),
      price: Number(body.price),
      rating: Number(body.rating),
      image: body.image.trim(),
      description: body.description.trim(),
    };

    properties.push(newProperty);

    res.status(201).json(newProperty);
  } catch (error) {
    next(error);
  }
};

// UPDATE
const updateProperty = (req, res, next) => {
  try {
    const body = req.body || {};
    const id = parseInt(req.params.id, 10);

    const property = properties.find((p) => p.id === id);

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

    const allowedUpdates = requiredFields.filter((field) => field in body);

    allowedUpdates.forEach((field) => {
      if (field === "price" || field === "rating") {
        property[field] = Number(body[field]);
        return;
      }

      property[field] = body[field].trim();
    });

    res.status(200).json(property);
  } catch (error) {
    next(error);
  }
};

// DELETE
const deleteProperty = (req, res, next) => {
  try {
    const id = parseInt(req.params.id, 10);

    const index = properties.findIndex((p) => p.id === id);

    if (index === -1) {
      return res.status(404).json({
        message: "Property not found",
      });
    }

    properties.splice(index, 1);

    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

// SEARCH
const searchProperties = (req, res, next) => {
  try {
    const query = req.query.q?.toLowerCase() || "";

    const result = properties.filter(
      (property) =>
        property.title.toLowerCase().includes(query) ||
        property.location.toLowerCase().includes(query)
    );

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
