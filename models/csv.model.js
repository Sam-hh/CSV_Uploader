const mongoose = require("mongoose");

// Define schema for CSV files
const csvSchema = new mongoose.Schema(
  {
    filename: {
      type: String,
      required: true,
    },
    header_row: {
      type: [Object],
    },
    data_rows: {
      type: [Object],
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt timestamps
  }
);

// Export the CSV model
module.exports = mongoose.model("CSV", csvSchema);
