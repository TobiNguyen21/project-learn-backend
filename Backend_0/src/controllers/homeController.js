const connection = require('../config/database');
const { getAllUsers, createUser, getUserById, updateUserById, deleteUserById } = require('../services/CRUDSevice');

const getHomepage = async (req, res) => {
    //process data
    let results = await getAllUsers();
    //console.log(">>check rows: ", results);
    //call model 

    return res.render('home.ejs', { listUsers: results })
}

const getABC = (req, res) => {
    res.send('check ABC')
}

const getTobi = (req, res) => {
    res.render('sample.ejs')
}

const postCreateUser = async (req, res) => {
    //console.log('>>>req.body: ', req.body)
    let email = req.body.email;
    let name = req.body.myName;
    let city = req.body.city;
    // let {email, name, city} = req.body;

    //console.log(">>> email :", email, " name : ", name, " city : ", city);

    await createUser(email, name, city);
    res.redirect('/');
    //console.log(">>check rows: ", results);
    //call model 

    //console.log('>>check results: ', results);

    // connection.query('select * from Users u',
    //     function (err, results, fields) {
    //         console.log(">>results= ", results);
    //     })

    // let results2 = await connection.query('select * from Users u')
    // console.log('>>check results: ', results2);
    // 
}

const getCreatePage = (req, res) => {
    res.render('create.ejs')
}


const getUpdatePage = async (req, res) => {

    // Route path: /user/:userId(\d+)
    // Request URL: http://localhost:3000/user/42
    // req.params: {"userId": "42"} 
    let userId = req.params.id;
    //console.log(req.params, '-', userId);

    let user = await getUserById(userId);

    res.render('edit.ejs', { userEdit: user }); // userEdit <-- user
}

const postUpdateUser = async (req, res) => {
    //console.log('>>>req.body: ', req.body)
    let email = req.body.email;
    let name = req.body.myName;
    let city = req.body.city;
    let userId = req.body.userId;

    console.log(">>> email :", email, " name : ", name, " city : ", city);

    await updateUserById(email, name, city, userId);

    //res.send("Update success");
    res.redirect('/');
}

const postDeleteUser = async (req, res) => {
    let userId = req.params.id;

    let user = await getUserById(userId);

    res.render('delete.ejs', { userEdit: user }); // userEdit <-- user
}

const postHandleRemoveUser = async (req, res) => {
    let userid = req.body.userId;

    await deleteUserById(userid);

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