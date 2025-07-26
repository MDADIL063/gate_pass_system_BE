const express = require("express");
const authController = express.Router();
const multer = require("multer");
const User = require("../Schemas/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    return cb(null, "./uploads");
  },
  filename: function (req, file, cb) {
    return cb(null, `${Date.now()}=${file.originalname}`);
  },
});
const upload = multer({ storage });

// Register API

authController.post("/register", upload.single("file"), async (req, resp) => {
  const { email, mobileNumber, password } = req.body;

  // checking user existing of not in DB
  const existingUser = await User.findOne({ $or: [{ email }, { mobileNumber }] });
  if (existingUser) {
    return resp.status(400).json({ message: "User already registered" });
  }
  req.body.department = req.body.department || null;
  req.body.academicYear = req.body.academicYear || null;

  // Hash password
  const salt = await bcrypt.genSalt(10);
  const hashPassword = await bcrypt.hash(password, salt);
  req.body.password = hashPassword;

  let user = new User(req.body);
  let result = await user.save();
  resp.send(result);
});

// Login API

authController.post("/login", async (req, resp) => {
  const { emailOrMobileNumber, password } = req.body;

  if (!emailOrMobileNumber || !password) {
    return resp.status(400).json({ message: "Email/Mobile and password are required" });
  }
  try {
    // Find by email or mobile number
    const user = await User.findOne({
      $or: [{ email: emailOrMobileNumber }, { mobileNumber: emailOrMobileNumber }],
    });

    if (!user) {
      return resp.status(404).json({ message: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return resp.status(401).json({ message: "Invalid password" });
    }

    // Generate JWT token (optional)
    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "24h" });

    return resp.status(200).json({
      message: "Login successful",
      token,
      user: { id: user._id },
    });
  } catch (err) {
    return resp.status(500).json({ message: "Server error", error: err.message });
  }
});

module.exports = authController;
