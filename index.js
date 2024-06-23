require("module-alias/register");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");

const app = express();
const PORT = 3000;
dotenv.config();

const corsOptions = {
  origin: process.env.ORIGIN_URL,
  methods: ["GET", "POST"], // Allow only GET and POST requests
  allowedHeaders: ["Content-Type"], // Allow only Content-Type header
};

app.use(cors());
app.use(bodyParser.json());

const authRouter = require("@routes/auth");
const authMiddleware = require("@middlewares/authMiddleware");
const adminBranchRouter = require("@routes/adminBranch");
const rasieQueryRouter = require("@routes/queries");

app.use("/auth", authRouter);

app.use(authMiddleware);
app.use("/admin-branch", adminBranchRouter);
app.use("/raise-query", rasieQueryRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
