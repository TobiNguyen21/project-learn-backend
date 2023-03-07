const express = require('express');
const router = express.Router();
const { getHomepage, getABC, getTobi, postCreateUser, getCreatePage, getUpdatePage, postUpdateUser, postDeleteUser, postHandleRemoveUser } = require('../controllers/homeController');

router.get('/', getHomepage);

router.get('/abc', getABC);

router.get('/tobi', getTobi);
router.get('/create', getCreatePage);
router.get('/update/:id', getUpdatePage);

// method post
router.post('/create-user', postCreateUser);
router.post('/update-user', postUpdateUser);
router.post('/delete-user/:id', postDeleteUser);
router.post('/delete-user', postHandleRemoveUser);
module.exports = router;