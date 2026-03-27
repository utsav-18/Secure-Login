const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
const mongoose = require("mongoose");
require("dotenv").config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected ✅"))
  .catch(err => console.log(err));

// Dummy login route
app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "admin" && password === "1234") {
    res.json({ message: "Login successful ✅" });
  } else {
    res.json({ message: "Invalid credentials ❌" });
  }
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});