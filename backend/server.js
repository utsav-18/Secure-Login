const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const userSchema = new mongoose.Schema({
  username: String,
  password: String,
});

const User = mongoose.model("User", userSchema);

app.post("/signup", async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      username,
      password: hashedPassword,
    });

    await user.save();

    res.json({ message: "User created successfully" });

  } catch (err) {
    res.status(500).json({ message: "Error creating user" });
  }
});


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
      message: "Login successful",
      token,
    });

  } catch (err) {
    console.error("Login error:", err);
    require('fs').appendFileSync('error.log', err.toString() + '\\n' + (err.stack || '') + '\\n');
    res.status(500).json({ message: "Error logging in" });
  }
});


app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});