const connection = require('../config/database');
const { getAllUsers, createUser, getUserById, updateUserById, deleteUserById } = require('../services/CRUDService');
const User = require('../models/user');

const getHomepage = async (req, res) => {
    let results = await User.find({});

    return res.render('home.ejs', { listUsers: results })
}

const getABC = (req, res) => {
    res.send('check ABC')
}

const getTobi = (req, res) => {
    res.render('sample.ejs')
}

const postCreateUser = async (req, res) => {
    let email = req.body.email;
    let name = req.body.myName;
    let city = req.body.city;

    await User.create({
        email: email,
        name: name,
        city: city,
    })
    res.redirect('/');
    //res.send('create user succeed')
}

const getCreatePage = (req, res) => {
    res.render('create.ejs')
}


const getUpdatePage = async (req, res) => {
    let userId = req.params.id;
    let user = await User.findById(userId).exec();

    res.render('edit.ejs', { userEdit: user }); // userEdit <-- user
}

const postUpdateUser = async (req, res) => {
    //console.log('>>>req.body: ', req.body)
    let email = req.body.email;
    let name = req.body.myName;
    let city = req.body.city;
    let userId = req.body.userId;

    console.log(">>> email :", email, " name : ", name, " city : ", city);

    await User.updateOne({ _id: userId }, { email: email, name: name, city: city });
    //res.send("Update success");
    res.redirect('/');
}

const postDeleteUser = async (req, res) => {
    let userId = req.params.id;
    let user = await User.findById(userId).exec();
    res.render('delete.ejs', { userEdit: user }); // userEdit <-- user
}

const postHandleRemoveUser = async (req, res) => {
    let userid = req.body.userId;
    await User.deleteOne({ _id: userid });
    res.redirect('/');
}

module.exports = {
    getHomepage,
    getABC,
    getTobi,
    postCreateUser,
    getCreatePage,
    getUpdatePage,
    postUpdateUser,
    postDeleteUser,
    postHandleRemoveUser
}