const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;

const verifyToken = (token) => {
  try {
    const decodedToken = jwt.verify(token, JWT_SECRET);
    return decodedToken;
  } catch (error) {
    throw new Error("Invalid token.");
  }
};

const extractUserIdFromToken = (decodedToken) => {
  if (decodedToken && decodedToken.userId) {
    return decodedToken.userId;
  } else {
    throw new Error("Invalid or missing user ID in token.");
  }
};

const authVerify = (req, res, next) => {
  const encodedToken = req.headers.authorization;
  try {
    const decodedToken = verifyToken(encodedToken);
    const userId = extractUserIdFromToken(decodedToken);
    req.user = { userId };
    return next();
  } catch (error) {
    res
      .status(401)
      .json({ error: "Unauthorized access. Please add valid token." });
  }
};

module.exports = authVerify;
