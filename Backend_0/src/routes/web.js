const express = require('express');
const router = express.Router();
const { getHomepage, getABC, getTobi, postCreateUser, getCreatePage, getUpdatePage } = require('../controllers/homeController');

router.get('/', getHomepage);

router.get('/abc', getABC);

router.get('/tobi', getTobi);
router.get('/create', getCreatePage);
router.get('/update/:id', getUpdatePage);

router.post('/create-user', postCreateUser);

module.exports = router;