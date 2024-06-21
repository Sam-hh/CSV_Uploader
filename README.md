# CSV File Management Web Application

## Hosted URL : https://csv-uploader-ggwk.onrender.com

This is a simple web application built with Node.js and Express for managing CSV files. It allows users to upload CSV files, view them with pagination and sorting features, and delete them.

## Features

- **Upload CSV Files**: Users can upload CSV files through a web form.
- **View CSV Data**: Uploaded CSV files can be viewed with pagination and sorting capabilities.
- **Delete CSV Files**: Users can delete uploaded CSV files.

## Technologies Used

- **Backend**: Node.js, Express.js, MongoDB (Mongoose)
- **Frontend**: EJS (Embedded JavaScript), Bootstrap
- **Database**: MongoDB Atlas (cloud-hosted MongoDB)
- **File Handling**: Multer for file uploads, fs (File System) for file operations

## Prerequisites

Before running this project locally, ensure you have the following installed:

- Node.js (with npm)
- MongoDB (running locally or via a cloud service)
- Git (optional, for cloning the repository)

## Installation

1. **Clone the repository**:

         git clone <repository-url>
         cd <project-folder>


2. **Install dependencies**

          npm install 

5. **Set environment variables**:

    Create a .env file in the root directory and configure the following variables:

            DB_USERNAME=<your-database-username>
            DB_PASSWORD=<your-database-password>
            DB_NAME=<your-database-name>
            DB_CLUSTER=<your-database-cluster-url>
            PORT=<port-number>

4. **Set environment variables**:

       npm index.js // npm start

The application will start running on http://localhost:3000.

## Usage

- **Upload CSV**: Navigate to the home page and use the upload form to select and upload a CSV file.
- **View CSV**: After uploading, click on the "View" button next to each file to see its contents with pagination and sorting options.
- **Delete CSV**: Use the "Delete" button to remove uploaded CSV files.

## Folder Structure

- /config
    - mongoose.js           # MongoDB connection setup
- /controllers
    - csv_controller.js     # Handles CSV file upload, view, and delete operations
    - home_controller.js    # Manages home page rendering and CSV file management
- /models
    - csvModel.js           # Mongoose schema for CSV files
- /public
    - /css
        - styles.css        # Custom CSS styles
- /routes
    - csvRoutes.js          # Express routes for CSV file operations
- /uploads                 # Directory for uploaded CSV files
- /views
    - csv_view.ejs          # EJS template for viewing CSV files
    - home.ejs              # EJS template for home page
    - layout.ejs            # Main layout template
    - _header.ejs           # Header partial template
- .env                     # Environment variables configuration
- app.js                   # Entry point of the application
- package.json             # Node.js dependencies and scripts
- README.md                # This file


## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.
