const { Router } = require('express');
const express = require('express');

const router = express.Router();

router.get('/', (req, res) => {
    res.send('Hello World Tobi with nodemon!')
})

router.get('/abc', (req, res) => {
    res.send('check abc')
})

router.get('/tobi', (req, res) => {
    res.render('sample.ejs')
})

module.exports = router;