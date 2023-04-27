const { createProject, getProject, updateProject } = require('../services/productService');

module.exports = {
    postCreateEmptyProjectAPI: async (req, res) => {
        let result = await createProject(req.body);
        return res.status(200).json({
            EC: 0,
            data: result
        })
    },
    getProjectAPI: async (req, res) => {
        let result = await getProject(req.query);
        return res.status(200).json({
            EC: 0,
            result
        });
    },
    updateProjectAPI: async (req, res) => {
        // console.log(req.body);
        let result = await updateProject(req.body);
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
    deleteProjectAPI: async (req, res) => {

    }
}