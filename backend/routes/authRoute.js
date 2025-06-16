const express = require("express");
const router = express.Router();
const { body } = require("express-validator");
const { register } = require("../controllers/authController");
const User = require("../models/User");

router.post(
  "/register",
  [
    body("email")
      .isEmail()
      .withMessage("Invalid email address!")
      .normalizeEmail(),
    body("username")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Username must be at least 3 characters!")
      .isLength({ max: 10 })
      .withMessage("Username must be less than 10 characters!"),
    body("password")
      .trim()
      .isLength({ min: 4 })
      .withMessage("Password must be at least 4 characters!"),
  ],
  register
);

module.exports = router;
