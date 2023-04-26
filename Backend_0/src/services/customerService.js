const Customer = require("../models/customer");
const aqp = require('api-query-params');

const getAllCustomerService = async (limit1, page, name, queryString) => {
    try {
        let result = null;
        if (limit1 && page) {
            let offset = (page - 1) * limit;

            const { filter, limit } = aqp(queryString);
            delete filter.page;
            console.log(">>> check filter: ", filter);

            result = await Customer.find(filter).skip(offset).limit(limit).exec();

        } else {
            result = await Customer.find({});
        }
        return result;
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