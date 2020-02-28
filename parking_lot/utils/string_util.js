const {
    isString,
} = require('util');


const sanitizeTextInLine = (rawText) => {
    if (!rawText || !isString(rawText)) {
        return null;
    }

    return rawText.trim();
};

module.exports = {
    sanitizeTextInLine,
};