const { Schema, model } = require("mongoose");

const NoteSchema = new Schema(
  {
    title: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 100,
    },
    description: {
      type: String,
      required: true,
      minLength: 5,
    },
    cover_image: {
      type: String,
    },
    creator: {
      type: String,
      default: "Anonymous",
    },
  },
  { timestamps: true }
);

module.exports = model("Note", NoteSchema);
