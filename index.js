require("module-alias/register");
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
const PORT = 3000;

const corsOptions = {
  origin: "http://localhost:5173", // Replace with your React app's URL
  methods: ["GET", "POST"], // Allow only GET and POST requests
  allowedHeaders: ["Content-Type"], // Allow only Content-Type header
};

app.use(cors(corsOptions));
app.use(bodyParser.json());

const AuthRouter = require("@routes/auth");

app.use("/auth", AuthRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});
