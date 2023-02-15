const getHomepage = (req, res) => {
    res.send('hello world')
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