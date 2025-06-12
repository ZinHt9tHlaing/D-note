const { validationResult } = require("express-validator");
const Note = require("../models/Note");

exports.createNote = async (req, res) => {
  const { title, description } = req.body;

  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      message: "Validation failed",
      errorMessage: errors.array(),
    });
  }

  await Note.create({ title, description })
    .then((_) => {
      res.status(201).json({
        message: "Note created",
      });
    })
    .catch((err) => {
      console.log("error", err);
      res.status(404).json({ message: "Note creation failed!" });
    });
};

exports.getNotes = async (req, res) => {
  await Note.find()
    .sort({ createdAt: -1 })
    .then((notes) => {
      res.status(200).json(notes);
    })
    .catch((err) => {
      console.log("error", err);
      res.status(404).json({ message: "Note not found!" });
    });
};

exports.getDetailNote = async (req, res) => {
  const { id } = req.params;
  try {
    const note = await Note.findById(id);
    if (!note) {
      return res.status(404).json({ message: "Note not found!" });
    }
    res.status(200).json(note);
  } catch (error) {
    console.log("error", error);
    res.status(404).json({ message: "Something went wrong" });
  }
};
