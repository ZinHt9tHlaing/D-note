const express = require("express");
const { body } = require("express-validator");
const {
  createNote,
  getDetailNote,
  deleteNote,
  getAllNotes,
  updateNote,
} = require("../controllers/noteController");

const router = express.Router();

router.post(
  "/create",
  [
    body("title")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Title must be at least 3 characters")
      .isLength({ max: 100 })
      .withMessage("Title must be less than 100 characters"),
    body("description")
      .trim()
      .isLength({ min: 5 })
      .withMessage("Title must be at least 5 characters"),
  ],
  createNote
);

router.get("/notes", getAllNotes);

router.get("/note/:id", getDetailNote);

router.put("/update-note/:id", updateNote);

router.delete("/delete-note/:id", deleteNote);

module.exports = router;
