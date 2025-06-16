const { validationResult } = require("express-validator");
const bcrypt = require("bcrypt");
const User = require("../models/User");

exports.register = async (req, res) => {
  const { email, username, password } = req.body;

  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Validation failed",
        errorMessage: errors.array(),
      });
    }

    const existingUser = await User.findOne({ email, username });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists!" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registration successful!",
      userId: user._id,
    });
  } catch (error) {
    console.log("error", err);
    res.status(500).json({ message: "User registration failed!" });
  }
};
