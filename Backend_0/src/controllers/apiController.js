const User = require('../models/user');
const { upLoadSingleFile } = require('../services/fileService');

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
        res.status(400).send('No files were uploaded.');
        return;
    }


    const result = await upLoadSingleFile(req.files.image);
    console.log(">>> result: ", result);

    return res.send("ok file");
}

module.exports = {
    getUsersAPI,
    postCreateUserAPI,
    putUpdateUserAPI,
    deleteUserAPI,
    postUploadSingleFileAPI
};