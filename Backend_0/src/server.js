require('dotenv').config();// Load environment variables from a .env file into process.env
const express = require('express');// Require the express module
const path = require('path')// Require the path module
const configViewEngine = require('./config/viewEngine')// Require the custom module that configures the view engine
const webRoutes = require('./routes/web')// Require the custom module that exports the web application routes
const connection = require('./config/database');
const app = express();// Create an Express application instance

// Set the port number for the application
// Use the value of the PORT environment variable if it's set,
// or use 8888 as a default value if it's not
const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME;// Get the hostname from the HOST_NAME environment variable

//config template engine
//Purpose: to enable rendering of dynamic content & data to be sent to the client-side
app.use(express.json()) //for json
app.use(express.urlencoded({ extended: true })) //for form data

// Configure the view engine for the Express application
configViewEngine(app)

// Mount the webRoutes module at the / path
app.use('/', webRoutes)

// Start the Express application and listen on the specified port and hostname
app.listen(port, hostname, () => {
    // Log a message to the console indicating that the application is listening
    console.log(`Example app listening on port ${port}`)
})