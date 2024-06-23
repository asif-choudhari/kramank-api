const express = require("express");
const pool = require("@config/db.config");

const router = express.Router();

router.get("/get-open-queries/:companyId", async (req, res) => {
  const { companyId } = req.params;

  try {
    const [[result]] = await pool.query("CALL getOpenQueriesByCompany(?);", [
      companyId,
    ]);

    return res.status(200).send(result);
  } catch (err) {
    console.error("Error executing query:", err);
    res.status(500).send("Internal server error");
  }
});

router.post("/add-query", async (req, res) => {
  const { companyId, query } = req.body;
  try {
    await pool.query("CALL addOpenQuery(?, ?, ?, ?, ?);", [
      companyId,
      query.type,
      query.title,
      query.description,
      query.status,
    ]);

    return res.status(201).send();
  } catch (err) {
    console.error("Error executing query:", err);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
