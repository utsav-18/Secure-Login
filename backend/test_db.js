const mongoose = require("mongoose");
require("dotenv").config({ path: "u:/OneDrive/Desktop/Universe/Websites/Login_signUp/backend/.env" });

async function testConnection() {
  try {
    console.log("Connecting to:", process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected successfully");
    const User = mongoose.model("User", new mongoose.Schema({ username: String }));
    const result = await User.findOne({ username: "test" });
    console.log("Find one returned:", result);
    process.exit(0);
  } catch (err) {
    console.error("Connection error:", err);
    process.exit(1);
  }
}
testConnection();
