const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const multer = require("multer");
const path = require("path");
const dotenv = require("dotenv").config();

// routes
const noteRoutes = require("./routes/noteRoute");
const {
  storageConfigure,
  fileFilterConfigure,
} = require("./middleware/storage");

const app = express();

app.use("/uploads", express.static(path.join(__dirname, "/uploads")));
app.use(bodyParser.json());
app.use(
  multer({ storage: storageConfigure, fileFilter: fileFilterConfigure }).single(
    "cover_image"
  )
);
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(noteRoutes);

mongoose
  .connect(process.env.MONGO_URL)
  .then((_) => {
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  })
  .catch((err) => console.log("Database connection error :", err));
