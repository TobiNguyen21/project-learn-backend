const { createTask, getTasks, updateTask, deleteTask } = require('../services/taskService');

module.exports = {
    postTaskAPI: async (req, res) => {
        let result = await createTask(req.body);

        return res.status(200).json({
            EC: 0,
            result: result
        });
    },
    getTasksAPI: async (req, res) => {
        let result = await getTasks(req.query);
        return res.status(200).json({
            EC: 0,
            result: result
        });
    },
    updateTaskAPI: async (req, res) => {
        let result = await updateTask(req.body);
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
    deleteTaskAPI: async (req, res) => {
        let result = await deleteTask(req.body.id);

        return res.status(200).json({
            EC: 0,
            result: result
        })
    }



}