const Project = require('../models/project');

module.exports = {
    createProject: async (data) => {
        if (data.type === "EMPTY-PROJECT") {
            let result = await Project.create(data);
            return result;
        }
        else if (data.type === "ADD-USERS") {
            console.log(">>> check data: ", data);
            let myProject = await Project.findById(data.projectId).exec();

            data.usersArr.forEach(element => {
                myProject.usersInfor.push(element);
            });

            let newResult = await myProject.save();

            console.log(myProject);
            //find project by id
            return newResult;
        }
        else return null;
    }
}