const express = require("express");
const { body } = require("express-validator");
const { getNotes, createNote, getDetailNote } = require("../controllers/noteController");

const router = express.Router();

router.post(
  "/create",
  [
    body("title")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Title must be at least 3 characters")
      .isLength({ max: 30 })
      .withMessage("Title must be less than 30 characters"),
    body("description")
      .trim()
      .isLength({ min: 5 })
      .withMessage("Title must be at least 5 characters"),
  ],
  createNote
);

router.get("/notes", getNotes);

router.get("/note/:id", getDetailNote);

module.exports = router;
