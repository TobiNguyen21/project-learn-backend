const Customer = require("../models/customer");

const createCustomerService = async (customerData) => {
    try {
        return await Customer.create({
            name: customerData.name,
            address: customerData.address,
            phone: customerData.phone,
            email: customerData.email,
            description: customerData.description,
            image: customerData.image
        });
    } catch (error) {
        console.log(error);
        return null;
    }
}

const createArrayCustomerService = async (arrayCustomerData) => {
    try {
        return await Customer.insertMany(arrayCustomerData);
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = {
    createCustomerService,
    createArrayCustomerService
}