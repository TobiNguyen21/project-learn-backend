require('dotenv').config();
const express = require('express');
const path = require('path');
const configViewEngine = require('./config/viewEngine');
const webRoutes = require('./routes/web');
const apiRoutes = require('./routes/api');
const connection = require('./config/database');

const app = express();
const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME;

//config template engine
app.use(express.json()); //for json
app.use(express.urlencoded({ extended: true }));//for form data

configViewEngine(app);

app.use('/', webRoutes);
app.use('/v1/api/', apiRoutes);


//test connection
// using seft function
(async () => {
    try {
        await connection();
        app.listen(port, hostname, () => {
            // Log a message to the console indicating that the application is listening
            console.log(`Backend zero app listening on port ${port}`)
        });
    } catch (error) {
        console.log(">> Error connect to db", error);
    }
})();


