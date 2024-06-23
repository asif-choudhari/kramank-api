const express = require("express");
const pool = require("@config/db.config");

const router = express.Router();

router.get("/get-admin-branch-relationship/:companyId", async (req, res) => {
  const { companyId } = req.params;

  try {
    const [[adminList]] = await pool.query("CALL getAdminList(?);", [
      companyId,
    ]);

    const [[branchList]] = await pool.query("CALL getBranchList(?);", [
      companyId,
    ]);

    const result = [];

    for (const admin of adminList) {
      const branches = branchList.filter(
        (branch) => branch.userId === admin.userId
      );

      const sanitizedBranches = branches.map(({ branchId, branchName }) => ({
        branchId,
        branchName,
      }));

      result.push({
        ...admin,
        branches: sanitizedBranches,
      });
    }

    return res.status(200).send(result);
  } catch (err) {
    console.error("Error executing query:", err);
    res.status(500).send("Internal server error");
  }
});

router.get("/get-admin-count/:companyId", async (req, res) => {
  const { companyId } = req.params;

  try {
    const [[result]] = await pool.query("CALL getAdminCount(?);", [companyId]);

    return res.status(200).send(result[0]);
  } catch (err) {
    console.error("Error executing query:", err);
    res.status(500).send("Internal server error");
  }
});

router.get("/get-admin-list/:companyId", async (req, res) => {
  const { companyId } = req.params;

  try {
    const [[result]] = await pool.query("CALL getAdminList(?);", [companyId]);

    return res.status(200).send(result);
  } catch (err) {
    console.error("Error executing query:", err);
    res.status(500).send("Internal server error");
  }
});

router.get("/get-branch-count/:companyId", async (req, res) => {
  const { companyId } = req.params;

  try {
    const [[result]] = await pool.query("CALL getBranchCount(?);", [companyId]);

    return res.status(200).send(result[0]);
  } catch (err) {
    console.error("Error executing query:", err);
    res.status(500).send("Internal server error");
  }
});

router.get("/get-branch-list/:companyId", async (req, res) => {
  const { companyId } = req.params;

  try {
    const [[result]] = await pool.query("CALL getBranchList(?);", [companyId]);

    return res.status(200).send(result);
  } catch (err) {
    console.error("Error executing query:", err);
    res.status(500).send("Internal server error");
  }
});

router.post("/set-branch-admin", async (req, res) => {
  const { userId, branchId } = req.body;
  try {
    await pool.query("CALL setBranchAdmin(?, ?);", [userId, branchId]);

    return res.status(200).send();
  } catch (err) {
    console.error("Error executing query:", err);
    res.status(500).send("Internal server error");
  }
});

module.exports = router;
