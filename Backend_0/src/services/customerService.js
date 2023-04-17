const Customer = require("../models/customer");

const getAllCustomerService = async () => {
    try {
        return await Customer.find({});
    } catch (error) {
        console.log(error);
        return null;
    }
}

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

const updateCustomerService = async (customerUpdateData) => {
    try {
        return await Customer.updateOne({ _id: customerUpdateData.customerId }, { name: customerUpdateData.name, email: customerUpdateData.email, address: customerUpdateData.address });
    } catch (error) {
        console.log(error);
        return null;
    }
}

const deleteACustomerService = async (idCustomerDelete) => {
    try {
        return await Customer.deleteById(idCustomerDelete);// using for soft-delete  -- static method
    } catch (error) {
        console.log(error);
        return null;
    }
}

const deleteArrayCustomerService = async (arrIds) => {
    try {
        return await Customer.delete({ _id: { $in: arrIds } });// using for soft-delete 
    } catch (error) {
        console.log(error);
        return null;
    }
}

module.exports = {
    getAllCustomerService,
    createCustomerService,
    createArrayCustomerService,
    updateCustomerService,
    deleteACustomerService,
    deleteArrayCustomerService
}