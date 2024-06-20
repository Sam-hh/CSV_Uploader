const mongoose = require("mongoose");
require("dotenv").config();

const { DB_USERNAME, DB_PASSWORD, DB_NAME, DB_CLUSTER } = process.env;

// Construct the MongoDB connection string
const url = `mongodb+srv://${encodeURIComponent(
  DB_USERNAME
)}:${encodeURIComponent(
  DB_PASSWORD
)}@${DB_CLUSTER}/${DB_NAME}?retryWrites=true&w=majority`;

// Connect to the MongoDB database
async function connectDB() {
  try {
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Database connected to the server successfully!");
  } catch (err) {
    console.error("MongoDB connection error:", err);
  }
}

const db = mongoose.connection;

// Handle connection errors
db.on("error", console.error.bind(console, "MongoDB connection error:"));

// Initiate the connection
connectDB();

module.exports = db;
