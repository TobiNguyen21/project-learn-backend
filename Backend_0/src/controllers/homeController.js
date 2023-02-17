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
module.exports = {
    getHomepage,
    getABC,
    getTobi
}