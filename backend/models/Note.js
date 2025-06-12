const { Schema, model } = require("mongoose");

const NoteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 30,
    },
    description: {
      type: String,
      required: true,
      minLength: 5,
    },
    creator: {
      type: String,
      default: "Anonymous",
    },
  },
  { timestamps: true }
);

module.exports = model("Note", NoteSchema);
