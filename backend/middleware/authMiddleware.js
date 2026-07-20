const jwt = require("jsonwebtoken");
const User = require("../models/User");

const protect = async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const secret = process.env.JWT_SECRET || "default_homestay_secret_key_2026";
      const decoded = jwt.verify(token, secret);

      const user = await User.findById(decoded.userId).select("-password");
      if (!user) {
        return res.status(401).json({ message: "Unauthorized - User not found" });
      }

      req.user = user;
      return next();
    } catch (error) {
      console.error("JWT verification error:", error.message);
      return res.status(401).json({ message: "Unauthorized - Invalid or expired token" });
    }
  }

  if (!token) {
    return res.status(401).json({ message: "Unauthorized - No token provided" });
  }
};

module.exports = { protect };
