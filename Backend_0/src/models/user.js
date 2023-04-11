const mongoose = require('mongoose');

const userScheme = new mongoose.Schema({
    name: String,
    email: String,
    city: String,
});

const User = mongoose.model('user', userScheme);

module.exports = User;