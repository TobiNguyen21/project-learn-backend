const { upLoadSingleFile, upLoadMultipleFiles } = require("../services/fileService");
const { getAllCustomerService, createCustomerService, createArrayCustomerService, updateCustomerService } = require("../services/customerService");

module.exports = {
    getAllCustomerAPI: async (req, res) => {
        let customers = await getAllCustomerService();
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
}


