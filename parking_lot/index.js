const parkinglotRoute = require('./modules/parkinglot_route');

const { isString, isArray, } = require('util');

const {
    ErrorResponse,
} = require('./models/customError_model');

const {
    readTextFile,
} = require('./utils/file_util');

const {
    readFileNameFromArgvs,
} = require('./utils/env_util');

const {
    sanitizeTextInLine,
} = require('./utils/string_util');

const {
    CHAR_SPLIT_TEXT_IN_LINE,
    CHAR_SPLIT_LINE,
    CONTENT_TEXT_FILE_IS_NULL_OR_EMPTY,
} = require('./constant');

const _handlerCustomError = (error) => {
    // Do morething...
    console.error(error.message);
};

const _handlerNonControlError = (error) => {
    console.error(error);
    process.exit(1);
};

(async function () {
    const fileName = readFileNameFromArgvs();
    if (!fileName) {
        return;
    }

    console.log('---------------Parking Lot---------------');
    console.log('-> Reading content of text file....');

    const contentFile = readTextFile(fileName);

    console.log('-> Finish read text file!');

    if (!contentFile) {
        console.error(CONTENT_TEXT_FILE_IS_NULL_OR_EMPTY);
        return;
    }

    const textLines = contentFile.split(CHAR_SPLIT_LINE);
    if (!textLines || !textLines.length) {
        console.error(CONTENT_TEXT_FILE_IS_NULL_OR_EMPTY);
        return;
    }

    textLines.forEach((item) => {
        const sanitizedText = sanitizeTextInLine(item);
        if (!sanitizedText) {
            return;
        }

        const [routeName, data, ...rest] = sanitizedText.split(CHAR_SPLIT_TEXT_IN_LINE);
        if (!routeName) {
            return;
        }

        try {
            const response = parkinglotRoute[routeName]({
                data,
                rest,
            });

            if (!response) {
                return;
            }

            if (isString(response)) {
                console.log(response);
                return;
            }

            if (isArray(response)) {
                response.forEach(item => console.log(item));
                return;
            }

            console.log(response);
        } catch (error) {

            if (error instanceof ErrorResponse) {
                _handlerCustomError(error);
                return;
            }

            _handlerNonControlError(error);
        }
    });

})()