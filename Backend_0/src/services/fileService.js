const path = require('path');
const upLoadSingleFile = async (fileObject) => {
    uploadPath = path.join('./src', 'public') + '/images/' + fileObject.name;

    try {
        await fileObject.mv(uploadPath);
        return {
            status: 'success',
            path: 'link-image',
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

const upLoadMultipleFiles = () => {

}

module.exports = {
    upLoadSingleFile,
    upLoadMultipleFiles
}