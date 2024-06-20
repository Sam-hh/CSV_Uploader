const fs = require("fs");
const csv = require("csv-parser");
const CSV = require("../models/csv.model");
const path = require("path");

// Handle CSV file upload
module.exports.upload = async function (req, res) {
  try {
    if (!req.file) {
      return res.status(400).send("No files were uploaded.");
    }

    const existingFile = await CSV.findOne({ filename: req.file.originalname });
    if (existingFile) {
      return res.status(400).send("A file with the same name already exists.");
    }

    const results = [];
    // Process the file data from buffer
    const bufferData = req.file.buffer.toString("utf8");
    const rows = bufferData.trim().split("\n");
    const header_row = rows[0].split(",");
    const data_rows = rows.slice(1).map((row) => {
      const row_data = {};
      row.split(",").forEach((value, index) => {
        row_data[header_row[index]] = value;
      });
      return row_data;
    });

    // Save to database
    const csvData = new CSV({
      filename: req.file.originalname,
      header_row: header_row,
      data_rows: data_rows,
    });
    await csvData.save();

    // Optionally save to disk
    const uploadsPath = path.join(__dirname, "../uploads");
    const newPath = path.join(uploadsPath, req.file.originalname);
    fs.writeFileSync(newPath, bufferData, { encoding: "utf8" });

    return res.redirect("/");
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

// View CSV file
module.exports.view = async function (req, res) {
  try {
    const csvFile = await CSV.findById(req.params.id);
    if (!csvFile) {
      return res.status(404).send("File not found");
    }

    const uploadsPath = path.join(__dirname, "../uploads");
    const fileData = await new Promise((resolve, reject) => {
      fs.readFile(
        path.join(uploadsPath, csvFile.filename),
        "utf8",
        (err, data) => {
          if (err) {
            reject(err);
          } else {
            const rows = data.trim().split("\n");
            const header_row = rows[0].split(",");
            const data_rows = rows.slice(1).map((row) => {
              const row_data = {};
              row.split(",").forEach((value, index) => {
                row_data[header_row[index]] = value;
              });
              return row_data;
            });
            resolve({ filename: csvFile.filename, header_row, data_rows });
          }
        }
      );
    });

    // Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = 100; // Limit to 100 entries per page
    const startIndex = (page - 1) * limit;
    const endIndex = page * limit;
    const paginatedDataRows = fileData.data_rows.slice(startIndex, endIndex);

    const totalPages = Math.ceil(fileData.data_rows.length / limit);

    const pagination = {
      currentPage: page,
      totalPages,
      nextPage: page < totalPages ? page + 1 : null,
      prevPage: page > 1 ? page - 1 : null,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
    };

    res.render("csv_view", {
      fileData: {
        filename: fileData.filename,
        header_row: fileData.header_row,
        data_rows: paginatedDataRows,
      },
      pagination,
      title: "CSV file",
      style:
        '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-KyZXEAg3QhqLMpG8r+Knujsl5+5hb7ie2P6JD0ESQ90tHI74wYcxKu4cgn5pWUKP" crossorigin="anonymous">',
      script:
        '<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-aYxM0cVtEpsbKf8jHZlFp1IHwiP9TI8VjFgk6ICbBHTjfdGrXy/x9sejbVt5orAY" crossorigin="anonymous"></script>',
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};

// Delete CSV file
module.exports.delete = async function (req, res) {
  try {
    const csvFile = await CSV.findById(req.params.id);
    if (!csvFile) {
      return res.status(404).send("File not found");
    }

    const uploadsPath = path.join(__dirname, "../uploads");
    const filePath = path.join(uploadsPath, csvFile.filename);

    fs.unlink(filePath, async (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send("Internal server error");
      }

      await CSV.findByIdAndDelete(req.params.id);
      return res.redirect("/");
    });
  } catch (err) {
    console.error(err);
    res.status(500).send("Internal server error");
  }
};
