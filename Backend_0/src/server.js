// Load environment variables from a .env file into process.env
require('dotenv').config();

// Require the express module
const express = require('express');

// Require the path module
const path = require('path')

// Require the custom module that configures the view engine
const configViewEngine = require('./config/viewEngine')

// Require the custom module that exports the web application routes
const webRoutes = require('./routes/web')

// Create an Express application instance
const app = express();

// Set the port number for the application
// Use the value of the PORT environment variable if it's set,
// or use 8888 as a default value if it's not
const port = process.env.PORT || 8888;

// Get the hostname from the HOST_NAME environment variable
const hostname = process.env.HOST_NAME;

// Configure the view engine for the Express application
configViewEngine(app)

// Mount the webRoutes module at the /test path
app.use('/test', webRoutes)

// Start the Express application and listen on the specified port and hostname
app.listen(port, hostname, () => {
    // Log a message to the console indicating that the application is listening
    console.log(`Example app listening on port ${port}`)
})