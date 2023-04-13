const mongoose = require('mongoose');

const customerScheme = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    address: String,
    phone: String,
    email: String,
    image: String,
    description: String
},
    { timestamps: true }
);

const Customer = mongoose.model('Customer', customerScheme);

module.exports = Customer;