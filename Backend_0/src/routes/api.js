const express = require('express');
const routerAPI = express.Router();
const { getUsersAPI } = require('../controllers/apiController');

routerAPI.get('/', (req, res) => {
    res.send('hello api');
});

routerAPI.get('/abc', (req, res) => {
    res.status(201).json({
        data: 'hello world first api'
    });
});

routerAPI.get('/users', getUsersAPI);

module.exports = routerAPI;