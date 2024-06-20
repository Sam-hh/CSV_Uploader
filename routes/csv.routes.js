const express = require("express");
const router = express.Router();
const multer = require("multer");

const homeController = require("../controllers/home.controller");
const csvController = require("../controllers/csv.controller");

// Configure multer for file uploads
const upload = multer({ storage: multer.memoryStorage() }).single("csv");

// Routes
router.get("/", homeController.home); // Home route
router.get("/csv/:id", csvController.view); // View CSV file route
router.post("/upload", upload, csvController.upload); // Upload CSV file route
router.post("/delete/:id", csvController.delete); // Delete CSV file route

module.exports = router; // Export the router
