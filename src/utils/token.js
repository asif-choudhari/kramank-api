const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const generateJWTToken = (user, expiresIn) => {
  const jwtToken = jwt.sign(user, process.env.SECRET_KEY, {
    expiresIn,
  });
  return jwtToken;
};

const decodeJWTToken = (token) => {
  try {
    return jwt.verify(token, process.env.SECRET_KEY);
  } catch (error) {
    throw new Error("Invalid token");
  }
};

module.exports = {
  generateJWTToken,
  decodeJWTToken,
};
