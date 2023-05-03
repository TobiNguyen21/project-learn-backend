const express = require('express');
const routerAPI = express.Router();
const { getUsersAPI, postCreateUserAPI, putUpdateUserAPI,
    deleteUserAPI, postUploadSingleFileAPI, postUploadMultipleFilesAPI } = require('../controllers/apiUserController');
const { getAllCustomerAPI, postCreateCustomerAPI, postCreateArrayCustomerAPI,
    putUpdateCustomerAPI, deteteACustomerAPI, deleteArrayCustomerAPI } = require('../controllers/apiCustomerController');
const { postCreateEmptyProjectAPI, getProjectAPI, updateProjectAPI, deleteProjectAPI } = require('../controllers/apiProjectController');
const { postTaskAPI, getTasksAPI, updateTaskAPI, deleteTaskAPI } = require('../controllers/apiTaskController');

//-------------- FOR USER----------------//
routerAPI.get('/users', getUsersAPI);
routerAPI.post('/users', postCreateUserAPI);
routerAPI.put('/users', putUpdateUserAPI);
routerAPI.delete('/users', deleteUserAPI);

//-------------- FOR FILE----------------//
routerAPI.post('/file', postUploadSingleFileAPI);
routerAPI.post('/files', postUploadMultipleFilesAPI);

//-------------- FOR CUSTOMERS----------------//
routerAPI.get('/customers', getAllCustomerAPI);
routerAPI.post('/customers', postCreateCustomerAPI);
routerAPI.post('/customers-many', postCreateArrayCustomerAPI);
routerAPI.put('/customers', putUpdateCustomerAPI);
routerAPI.delete('/customers', deteteACustomerAPI);
routerAPI.delete('/customers-many', deleteArrayCustomerAPI);

//-------------- FOR PROJECTS----------------//
routerAPI.post('/projects', postCreateEmptyProjectAPI);
routerAPI.get('/projects', getProjectAPI);
routerAPI.put('/projects', updateProjectAPI);
routerAPI.delete('/projects', deleteProjectAPI);

//-------------- FOR TASK----------------//
routerAPI.post('/task', postTaskAPI);
routerAPI.get('/task', getTasksAPI);
routerAPI.put('/task', updateTaskAPI);
routerAPI.delete('/task', deleteTaskAPI);


//Using req.query
routerAPI.get('/info', (req, res) => {
    return res.status(200).json({
        data: req.query
    })
});
//Using req.prams
routerAPI.get('/info/:name/:address', (req, res) => {
    return res.status(200).json({
        data: req.params
    })
})

module.exports = routerAPI;