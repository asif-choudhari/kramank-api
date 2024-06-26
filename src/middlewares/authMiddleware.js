const { decodeJWTToken } = require("@utils/token");

const authMiddleware = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "Invalid token format" });
  }

  try {
    const user = decodeJWTToken(token);
    req.user = user;
    next();
  } catch (error) {
    return res.status(403).json({ error: "Invalid or expired token" });
  }
};

module.exports = authMiddleware;
