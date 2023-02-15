const express = require('express');
const router = express.Router();
const { getHomepage, getABC, getTobi } = require('../controllers/homeController');

router.get('/', getHomepage)

router.get('/abc', getABC)

router.get('/tobi', getTobi)

module.exports = router;