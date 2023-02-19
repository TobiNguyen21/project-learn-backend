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
const postCreateUser = (req, res) => {
    console.log('>>>req.body: ', req.body)
    let email = req.body.email;
    let name = req.body.myName;
    let city = req.body.city;

    console.log(">>> email :", email, " name : ", name, " city : ", city);

    // let {email, name, city} = req,body;

    connection.query(
        `INSERT INTO 
        Users (email ,name ,city) 
        VALUES (?,?,?)`,
        [email, name, city],
        function (err, results) {
            //console.log(results);
            res.send(`Create new user succeed!`)
        }
    );

}
module.exports = {
    getHomepage,
    getABC,
    getTobi,
    postCreateUser
}