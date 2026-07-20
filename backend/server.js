const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const passport = require("passport");
const connectDB = require("./config/db");
const configurePassport = require("./config/passport");
const errorHandler = require("./middleware/errorHandler");
const propertyRoutes = require("./routes/propertyRoutes");
const authRoutes = require("./routes/authRoutes");

dotenv.config();

// Initialize passport strategy
configurePassport();

const app = express();
const PORT = process.env.PORT || 5000;

// CORS configuration - allow development & production client URL, never '*'
const allowedOrigins = [
  process.env.CLIENT_URL || "http://localhost:5173",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // allow requests with no origin (like mobile apps, curl, postman)
      if (!origin || allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error("CORS Policy error: Origin not allowed"), false);
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(passport.initialize());

// Register Auth Routes
app.use("/api/auth", authRoutes);

// Register Property Routes
app.use("/api/properties", propertyRoutes);

app.get("/", (req, res) => {
  res.status(200).json({
    message: "HomeStay Backend is Running",
  });
});

app.use(errorHandler);

const startServer = async () => {
  await connectDB();

  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
};

startServer();

