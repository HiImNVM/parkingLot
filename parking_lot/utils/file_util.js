const fs = require('fs');

const {
    isString,
} = require('util');



/**
 * Read content of text file with fileName
 * 
 * @param {String} fileName Name of file
 */
const readTextFile = (fileName) => {
    if (!fileName || !isString(fileName)) {
        return null;
    }

    let contentFile;
    try {
        contentFile = fs.readFileSync(fileName, { encoding: 'utf8' });
    } catch (error) {
        return null;
    }

    if (!contentFile || !isString(contentFile)) {
        return null;
    }

    return contentFile;
};

module.exports = {
    readTextFile,
};
