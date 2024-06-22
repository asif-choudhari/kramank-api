const express = require("express");
const pool = require("@config/db.config");
const { createHash } = require("crypto");
const { generateJWTToken, decodeJWTToken } = require("@utils/token");

const router = express.Router();

router.post("/login", async (req, res) => {
  const { email, password } = req.body;
  const passwordHash = createHash("sha256").update(password).digest("base64");

  try {
    const [[result]] = await pool.query("CALL checkUserCredentials(?, ?);", [
      email,
      passwordHash,
    ]);

    if (result.length === 0) {
      return res.status(200).json({
        user: null,
        token: "",
        error: "Invalid login credentials",
      });
    } else {
      return res.status(200).json({
        user: result[0],
        token: generateJWTToken(result[0], "3hr"),
        error: "",
      });
    }
  } catch (err) {
    console.error("Error executing query:", err);
    res.status(500).send("Internal server error");
  }
});

router.get("/authorize", async (req, res) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ error: "No token provided" });
  }

  const token = authHeader.split(" ")[1];

  try {
    const result = decodeJWTToken(token);
    return res.status(200).json({
      firstName: result.firstName,
      lastName: result.lastName,
      email: result.email,
    });
  } catch (error) {
    return res.status(400).json("Invalid token");
  }
});

module.exports = router;
