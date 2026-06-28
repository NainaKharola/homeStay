require("dotenv").config();

const mongoose = require("mongoose");

const connectDB = require("./config/db");
const Property = require("./models/Property");
const properties = require("./data/properties");

const importData = async () => {
  try {
    await connectDB();

    // Delete old data
    await Property.deleteMany();

    // Insert new data
    await Property.insertMany(properties);

    console.log("Properties inserted successfully!");

    process.exit();
  } catch (error) {
    console.error(error);

    process.exit(1);
  }
};

importData();