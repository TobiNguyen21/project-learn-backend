const connection = require('../config/database');

const getHomepage = (req, res) => {
    //process data
    //call model 
    return res.render('home.ejs')
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

    let results2 = await connection.query('select * from Users u')
    console.log('>>check results: ', results2);
    // 
}

const getCreatePage = (req, res) => {
    res.render('create.ejs')
}
module.exports = {
    getHomepage,
    getABC,
    getTobi,
    postCreateUser,
    getCreatePage
}