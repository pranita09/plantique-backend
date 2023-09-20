const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const generateToken = (userId) => {
  return jwt.sign({ userId }, JWT_SECRET, { expiresIn: "24h" });
};

module.exports = { generateToken };
