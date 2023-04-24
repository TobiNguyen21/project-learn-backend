require('dotenv').config();
const express = require('express');
const path = require('path');
const configViewEngine = require('./config/viewEngine');
const webRoutes = require('./routes/web');
const apiRoutes = require('./routes/api');
const fileUpload = require('express-fileupload');
const connection = require('./config/database');
const { MongoClient } = require("mongodb");
const { collection } = require('./models/customer');

const app = express();
const port = process.env.PORT || 8888;
const hostname = process.env.HOST_NAME;

//config file upload
app.use(fileUpload());

//config req.body
app.use(express.json()); //for json
app.use(express.urlencoded({ extended: true }));//for form data

configViewEngine(app);

app.use('/', webRoutes);
app.use('/v1/api/', apiRoutes);

//test connection
// using seft function
(async () => {
    try {
        //using mogoose
        // await connection();

        //using mongodb driver
        const url = process.env.DB_HOST_WITH_DRIVER;
        const client = new MongoClient(url);

        await client.connect();
        console.log('Connected successfully to server');

        const dbName = process.env.DB_NAME;
        const db = client.db(dbName);
        const coll = db.collection('customers')

        // await coll.insertOne({ name: 'Jackie Robinson 2', address: 'Ho Chi Minh' });

        console.log(">> find = ", await coll.findOne({ address: "Ho Chi Minh" }));

        // Database Name
        app.listen(port, hostname, () => {
            // Log a message to the console indicating that the application is listening
            console.log(`Backend zero app listening on port ${port}`)
        });
    } catch (error) {
        console.log(">> Error connect to db", error);
    }
})();


