const CSV = require("../models/csv.model");

// Home page rendering
module.exports.home = async function (req, res) {
  try {
    const csvFiles = await CSV.find({}); // Fetch all CSV files from the database

    res.render("home", {
      files: csvFiles, // Pass files data to the view
      title: "Home",
      style:
        '<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-rbsA2VBKQhggwzxH7pPCaAqO46MgnOM80zW1RWuH61DGLwZJEdK2Kadq2F9CUG65" crossorigin="anonymous">',
      script:
        '<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.2.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-kenU1KFdBIe4zVF0s0G1M5b4hcpxyD9F7jL+jjXkk+Q2h455rYXK/7HAuoJl+0I4" crossorigin="anonymous"></script>',
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal server error" }); // Handle errors
  }
};
