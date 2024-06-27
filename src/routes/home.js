const express = require("express");
const pool = require("@config/db.config");

const router = express.Router();

router.get("/get-consumption/:companyId", async (req, res) => {
  const { companyId } = req.params;

  try {
    const [[result]] = await pool.query("CALL getConsumption(?);", [companyId]);

    return res.status(200).send(result[0]);
  } catch (err) {
    console.error("Error executing query:", err);
    res.status(500).send("Internal server error");
  }
});

router.get("/get-geographies-count/:companyId", async (req, res) => {
  const { companyId } = req.params;

  try {
    const [[result]] = await pool.query("CALL getGeographiesCount(?);", [
      companyId,
    ]);

    return res.status(200).send(result[0]);
  } catch (err) {
    console.error("Error executing query:", err);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
