const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

/* ================= DB CONNECTION ================= */

mongoose.connect(process.env.MONGO_URI, {
  serverSelectionTimeoutMS: 5000,
})
.then(() => {
  console.log("✅ MongoDB Connected");

  // Start server ONLY after DB connects
  app.listen(process.env.PORT, () => {
    console.log(`🚀 Server running on port ${process.env.PORT}`);
  });
})
.catch(err => {
  console.log("❌ DB Connection Error:");
  console.log(err.message);
});

/* ================= USER SCHEMA ================= */

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

/* ================= SIGNUP ================= */

app.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      password: hashedPassword,
    });

    await user.save();

    res.json({ message: "User created successfully ✅" });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating user ❌" });
  }
});

/* ================= LOGIN ================= */

app.post("/login", async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (!user) {
      return res.json({ message: "User not found ❌" });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.json({ message: "Invalid password ❌" });
    }

    const token = jwt.sign(
      { id: user._id, username: user.username },
      "secretkey",
      { expiresIn: "1h" }
    );

    res.json({
      message: "Login successful ✅",
      token,
    });

  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ message: "Error logging in ❌" });
  }
});