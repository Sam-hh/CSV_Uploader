const express = require("express");
const path = require("path");
const expressLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");
require("dotenv").config();

const PORT = process.env.PORT || 3000;
const app = express();

// Middleware
app.use(expressLayouts);
app.use(express.static("public"));

// EJS setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Routes
app.use("/", require("./routes/csv.routes"));

// Server listening
app.listen(PORT, (err) => {
  if (err) {
    console.error("Error listening on port", PORT);
  } else {
    console.log("Listening on port", PORT);
  }
});
