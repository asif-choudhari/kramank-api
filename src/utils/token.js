const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

dotenv.config();

const generateJWTToken = (user, expiresIn) => {
  const jwtToken = jwt.sign(user, process.env.SECRET_KEY, {
    expiresIn,
  });
  return jwtToken;
};

module.exports = {
  generateJWTToken,
};
