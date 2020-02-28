class ErrorResponse {
    constructor(message) {
        this.message = message;
    }
}


class ErrorInvalidRequest extends ErrorResponse {
    constructor(message) {
        super(message);
    }
}

class ErrorStore extends ErrorResponse {
    constructor(message) {
        super(message);
    }
}

class ErrorExistData extends ErrorResponse {
    constructor(message) {
        super(message);
    }
}

class ErrorMaximum extends ErrorResponse {
    constructor(message) {
        super(message);
    }
}

module.exports = {
    ErrorMaximum,
    ErrorStore,
    ErrorResponse,
    ErrorInvalidRequest,
    ErrorExistData,
};