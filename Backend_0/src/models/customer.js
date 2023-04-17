const mongoose = require('mongoose');
const mongoose_delete = require('mongoose-delete');

const customerScheme = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    address: String,
    phone: String,
    email: String,
    image: String,
    description: String
},
    { timestamps: true }
);

// config to use soft-delete and override all method
customerScheme.plugin(mongoose_delete, { overrideMethods: "all" });

const Customer = mongoose.model('Customer', customerScheme);

module.exports = Customer;