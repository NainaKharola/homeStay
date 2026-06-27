const dotenv = require("dotenv");
const mongoose = require("mongoose");
const connectDB = require("./config/db");
const Property = require("./models/Property");
const properties = require("./data/properties");

dotenv.config();

const seedProperties = async () => {
  try {
    await connectDB();

    await Property.deleteMany();
    await Property.insertMany(
      properties.map(({ title, location, price, rating, image, description }) => ({
        title,
        location,
        price,
        rating,
        image,
        description,
      }))
    );

    console.log("Properties seeded successfully");
  } catch (error) {
    console.error(`Seeding failed: ${error.message}`);
    process.exitCode = 1;
  } finally {
    await mongoose.disconnect();
  }
};

seedProperties();
