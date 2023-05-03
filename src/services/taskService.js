const Task = require('../models/task');
const aqp = require('api-query-params');

module.exports = {
    createTask: async (data) => {
        let result;
        if (data.type === "EMPTY-TASK") {
            result = await Task.create(data);
        }
        return result;
    },
    getTasks: async (queryString) => {
        const page = queryString.page;
        const { filter, limit } = aqp(queryString);
        delete filter.page;

        let offset = (page - 1) * limit;
        let result = await Task.find(filter).skip(offset).limit(limit).exec();

        return result;
    },
    updateTask: async (data) => {
        try {
            let { id, ...rest } = data;
            //console.log(">>>rest: ", { ...rest })
            return await Task.updateOne({ _id: id }, { ...rest });
        } catch (error) {
            console.log(error);
            return null;
        }
    },
    deleteTask: async (id) => {
        try {
            return await Task.deleteById(id);// using for soft-delete  -- static method
        } catch (error) {
            console.log(error);
            return null;
        }
    }
}
