const path = require('path');
const upLoadSingleFile = async (fileObject) => {
    //let uploadPath = path.join('./src', 'public') + '/images/upload/' + fileObject.name;
    const parts = fileObject.name.split('.');
    const uploadPath = path.resolve(__dirname, "../public/images/upload") + '\\' + parts[0] + `-${Date.now()}` + '.' + parts[1];
    try {
        await fileObject.mv(uploadPath);
        return {
            status: 'success',
            path: uploadPath,
            error: null
        };
    } catch (err) {
        console.log(">>> check error: ", err);
        return {
            status: 'failed',
            path: null,
            error: JSON.stringify(err)
        };
    }
}

const upLoadMultipleFiles = async (filesObject) => {
    try {
        const results = [];
        for (const file of filesObject) {
            const result = await upLoadSingleFile(file);
            results.push(result);
        }
        return {
            status: 'success',
            result: results,
            error: null
        };
    } catch (err) {
        console.log(">>> check error: ", err);
        return {
            status: 'failed',
            path: null,
            error: JSON.stringify(err)
        };
    }
}

module.exports = {
    upLoadSingleFile,
    upLoadMultipleFiles
}