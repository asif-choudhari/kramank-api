const express = require("express");
const pool = require("@config/db.config");

const router = express.Router();

router.post("/", async (req, res) => {
  const {
    companyId,
    branchName,
    isNewAdmin,
    adminUserId,
    adminFirstName,
    adminLastName,
    adminEmail,
    adminMobile,
    address,
    state,
  } = req.body;

  try {
    await pool.query("CALL addNewBranch(?, ?, ?, ?, ?, ?, ?, ?, ?, ?);", [
      companyId,
      branchName,
      isNewAdmin,
      adminUserId,
      adminFirstName,
      adminLastName,
      adminEmail,
      adminMobile,
      address,
      state,
    ]);

    return res.status(204).send();
  } catch (err) {
    console.error("Error executing query:", err);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
