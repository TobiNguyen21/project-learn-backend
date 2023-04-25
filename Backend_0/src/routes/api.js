const express = require('express');
const routerAPI = express.Router();
const { getUsersAPI, postCreateUserAPI, putUpdateUserAPI,
    deleteUserAPI, postUploadSingleFileAPI, postUploadMultipleFilesAPI } = require('../controllers/apiUserController');
const { getAllCustomerAPI, postCreateCustomerAPI, postCreateArrayCustomerAPI,
    putUpdateCustomerAPI, deteteACustomerAPI, deleteArrayCustomerAPI } = require('../controllers/apiCustomerController');
const { postCreateEmptyProjectAPI } = require('../controllers/apiProjectController');

routerAPI.get('/users', getUsersAPI);
routerAPI.post('/users', postCreateUserAPI);
routerAPI.put('/users', putUpdateUserAPI);
routerAPI.delete('/users', deleteUserAPI);

routerAPI.post('/file', postUploadSingleFileAPI);
routerAPI.post('/files', postUploadMultipleFilesAPI);

routerAPI.get('/customers', getAllCustomerAPI);
routerAPI.post('/customers', postCreateCustomerAPI);
routerAPI.post('/customers-many', postCreateArrayCustomerAPI);
routerAPI.put('/customers', putUpdateCustomerAPI);
routerAPI.delete('/customers', deteteACustomerAPI);
routerAPI.delete('/customers-many', deleteArrayCustomerAPI);

routerAPI.post('/projects', postCreateEmptyProjectAPI);

routerAPI.get('/info', (req, res) => {
    return res.status(200).json({
        data: req.query
    })
});
routerAPI.get('/info/:name/:address', (req, res) => {
    return res.status(200).json({
        data: req.params
    })
})
module.exports = routerAPI;