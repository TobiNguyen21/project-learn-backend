const { upLoadSingleFile, upLoadMultipleFiles } = require("../services/fileService");
const Customer = require("../models/customer");

module.exports = {
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

        let customer = await Customer.create({
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
}

