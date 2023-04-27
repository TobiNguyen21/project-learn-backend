const Project = require('../models/project');
const aqp = require('api-query-params');

module.exports = {
    createProject: async (data) => {
        if (data.type === "EMPTY-PROJECT") {
            let result = await Project.create(data);
            return result;
        }
        else if (data.type === "ADD-USERS") {
            //console.log(">>> check data: ", data);
            let myProject = await Project.findById(data.projectId).exec();

            data.usersArr.forEach(element => {
                myProject.usersInfor.push(element);
            });
            let newResult = await myProject.save();
            return newResult;
        }
        else if (data.type === "REMOVE-USERS") {
            let myProject = await Project.findById(data.projectId).exec();

            data.usersArr.forEach(element => {
                myProject.usersInfor.pull(element);
            });
            let newResult = await myProject.save();
            return newResult;
        }
        else if (data.type === "ADD-TASK") {
            let myProject = await Project.findById(data.projectId).exec();

            data.tasksArr.forEach(element => {
                myProject.tasks.push(element);
            });
            let newResult = await myProject.save();
            return newResult;
        }
        else return null;
    },
    getProject: async (queryString) => {
        const page = queryString.page;
        const { filter, limit, population } = aqp(queryString);
        delete filter.page;

        let offset = (page - 1) * limit;
        let result = await Project.find(filter).populate(population).skip(offset).limit(limit).exec();

        return result;
    },
    updateProject: async (data) => {
        try {
            return await Project.updateOne({ _id: data.id }, { name: data.name, startDate: data.startDate, endDate: data.endDate, description: data.description });
        } catch (error) {
            console.log(error);
            return null;
        }
    },
    deleteProject: async (id) => {
        let result = await Project.deleteById(id);
        return result;
    }
}