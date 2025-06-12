const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();

// routes
const noteRoutes = require("./routes/noteRoute");

const app = express();

app.use(bodyParser.json());
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use("/api", noteRoutes);

mongoose
  .connect(process.env.MONGO_URL)
  .then((_) => {
    const PORT = process.env.PORT || 8000;
    app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
  })
  .catch((err) => console.log("Database connection error :", err));
