const jwt = require("jsonwebtoken");
const key = process.env.jwtSecret || "asdqwe123!@#asd";

exports.genToken = (user, option = { expiresIn: "1h" }) => {
  return jwt.sign(user, key, option);
};

// Function to verify the token
exports.verifyToken = (token) => {
  try {
    return jwt.verify(token, key);
  } catch (error) {
    throw new Error("Invalid token");
  }
};
