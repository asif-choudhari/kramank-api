const express = require("express");
const pool = require("@config/db.config");
const { createHash } = require("crypto");
const { generateJWTToken } = require("@utils/token");

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
        token: null,
        error: "Invalid login credentials",
      });
    } else {
      return res.status(200).json({
        user: result[0],
        token: generateJWTToken(result[0], "1m"),
        error: "",
      });
    }
  } catch (err) {
    console.error("Error executing query:", err);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
