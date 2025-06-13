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
      res.status(500).json({ message: "Note creation failed!" });
    });
};

exports.getAllNotes = async (req, res) => {
  await Note.find()
    .sort({ createdAt: -1 })
    .then((notes) => {
      res.status(200).json(notes);
    })
    .catch((err) => {
      console.log("error", err);
      res.status(500).json({ message: "Note not found!" });
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
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.deleteNote = async (req, res) => {
  const { id } = req.params;
  try {
    const note = await Note.findByIdAndDelete(id);
    if (!note) {
      return res.status(404).json({ message: "Note not found!" });
    }
    res.status(204).json({ message: "Note deleted!" });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

exports.updateNote = async (req, res) => {
  const { id } = req.params;
  const { title, description, note_id } = req.body;

  try {
    const note = await Note.findById(note_id);
    if (!note) {
      return res.status(404).json({ message: "Note not found!" });
    }
    note.title = title;
    note.description = description;
    await note.save();
    res.status(200).json({ message: "Note updated!" });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Something went wrong" });
  }
};
