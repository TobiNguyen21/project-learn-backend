const User = require('../models/user');
const { upLoadSingleFile, upLoadMultipleFiles } = require('../services/fileService');

const getUsersAPI = async (req, res) => {
    let results = await User.find({});
    return res.status(200).json({
        errorCode: 0,
        data: results
    })
}

const postCreateUserAPI = async (req, res) => {
    let email = req.body.email;
    let name = req.body.myName;
    let city = req.body.city;

    let user = await User.create({
        email: email,
        name: name,
        city: city,
    })

    return res.status(200).json({
        EC: 0,
        data: user
    })

}

const putUpdateUserAPI = async (req, res) => {
    let email = req.body.email;
    let name = req.body.myName;
    let city = req.body.city;
    let userId = req.body.userId;

    let user = await User.updateOne({ _id: userId }, { email: email, name: name, city: city });

    return res.status(200).json({
        EC: 0,
        data: user
    })
}

const deleteUserAPI = async (req, res) => {
    let userId = req.body.userId;
    let results = await User.deleteOne({ _id: userId });

    return res.status(200).json({
        EC: 0,
        data: results
    })
}

const postUploadSingleFileAPI = async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        return res.status(400).send('No files were uploaded.');
    }
    console.log(req.files.image);
    const file = req.files.image;

    const result = await upLoadSingleFile(file);
    console.log(">>> result: ", result);

    return res.send(result);
}

const postUploadMultipleFilesAPI = async (req, res) => {
    if (!req.files || Object.keys(req.files).length === 0) {
        res.status(400).send('No files were uploaded.');
        return;
    }
    console.log(req.files.image);
    const files = req.files.image;

    const result = await upLoadMultipleFiles(files);
    // console.log(">>> result: ", result);
    //console.log(files);

    return res.send(result);
}

module.exports = {
    getUsersAPI,
    postCreateUserAPI,
    putUpdateUserAPI,
    deleteUserAPI,
    postUploadSingleFileAPI,
    postUploadMultipleFilesAPI
};