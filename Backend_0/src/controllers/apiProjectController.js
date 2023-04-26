const { createProject, getProject } = require('../services/productService');

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
    }
}