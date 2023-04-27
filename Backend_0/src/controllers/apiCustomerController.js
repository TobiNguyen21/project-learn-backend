const { upLoadSingleFile, upLoadMultipleFiles } = require("../services/fileService");
const { getAllCustomerService, createCustomerService,
    createArrayCustomerService, updateCustomerService,
    deleteACustomerService, deleteArrayCustomerService } = require("../services/customerService");
const Joi = require('joi');


module.exports = {
    getAllCustomerAPI: async (req, res) => {

        let limit = req.query.limit;
        let page = req.query.page;
        let name = req.query.name;
        let customers = null;
        if (limit && page) {
            customers = await getAllCustomerService(limit, page, name, req.query);
        } else {
            customers = await getAllCustomerService();
        }

        if (customers) {
            res.status(200).json({
                EC: 0,
                data: customers
            });
        } else {
            res.status(200).json({
                EC: -1,
                data: customers
            })
        }
    },
    postCreateCustomerAPI: async (req, res) => {
        let { name, address, phone, email, description } = req.body;

        const schema = Joi.object({
            name: Joi.string()
                .alphanum()
                .min(3)
                .max(30)
                .required(),
            address: Joi.string(),
            phone: Joi.string().pattern(new RegExp('^[0,9]{8,11}$')),
            email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }),
            description: Joi.string()
        });

        let { error } = schema.validate(req.body, { abortEarly: false });

        if (error) {
            return res.status(200).json({
                msg: error
            });
        }
        else {
            let resultUploadImage;
            if (!req.files || Object.keys(req.files).length === 0) {
                resultUploadImage = { path: "error upload file" };
            } else {
                let image = req.files.image;
                resultUploadImage = await upLoadSingleFile(image);
            }

            console.log(">>> {obj}: ", { name, address, phone, email, resultUploadImage, description });

            let customer = await createCustomerService({
                name: name,
                address: address,
                phone: phone,
                email: email,
                image: resultUploadImage.path,
                description: description
            })

            return res.status(200).json({
                EC: 0,
                data: customer
            })
        }
    },
    postCreateArrayCustomerAPI: async (req, res) => {
        console.log(">>> check data: ", req.body.customers);
        let customers = await createArrayCustomerService(req.body.customers);
        if (customers) {
            res.status(200).json({
                EC: 0,
                data: customers
            });
        } else {
            res.status(200).json({
                EC: -1,
                data: customers
            })
        }
    },
    putUpdateCustomerAPI: async (req, res) => {
        console.log(req.body);
        let result = await updateCustomerService(req.body);
        if (result.modifiedCount === 0) {
            return res.status(200).json({
                EC: -1,
                result: "no update"
            });
        } else {
            return res.status(200).json({
                EC: 0,
                result: result
            });
        }
    },
    deteteACustomerAPI: async (req, res) => {
        let customerId = req.body.id;
        let result = await deleteACustomerService(customerId);
        return res.status(200).json({
            EC: 0,
            result: result
        });
    },
    deleteArrayCustomerAPI: async (req, res) => {
        let customerIds = req.body.customersId;
        console.log(customerIds);
        let result = await deleteArrayCustomerService(customerIds);
        return res.status(200).json({
            EC: 0,
            result: result
        });
    }
}


