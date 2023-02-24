const connection = require('../config/database');
const { getAllUsers, getUserById } = require('../services/CRUDSevice');

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
    console.log('>>>req.body: ', req.body)
    let email = req.body.email;
    let name = req.body.myName;
    let city = req.body.city;
    // let {email, name, city} = req.body;

    console.log(">>> email :", email, " name : ", name, " city : ", city);

    let [results, fields] = await connection.query(
        `INSERT INTO Users (email ,name ,city) VALUES (?,?,?)`, [email, name, city]
    );

    console.log('>>check results: ', results);

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
    const userId = req.params.id;
    //console.log(req.params, '-', UserId);

    let user = await getUserById(userId);

    res.render('edit.ejs', { userEdit: user }); // userEdit <-- user
}
module.exports = {
    getHomepage,
    getABC,
    getTobi,
    postCreateUser,
    getCreatePage,
    getUpdatePage
}