const { validationResult } = require("express-validator");

exports.createNote = async (req, res) => {
  const { title, description } = req.body;

  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        message: "Validation failed",
        errorMessage: errors.array(),
      });
    }

    res.status(201).json({
      message: "Note created",
      data: { title, description },
    });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Server error" });
  }
};

exports.getNotes = async (req, res) => {};
