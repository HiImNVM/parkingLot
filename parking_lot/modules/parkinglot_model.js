const {
    isString,
} = require('util');

const validInitParkinglotParam = (slotTotal) => {
    if (!slotTotal) {
        return {
            error: 'Slot is null or empty. Please check again!',
        };
    }

    if (!isString(slotTotal)) {
        return {
            error: 'Slot is not string. Please check again!',
        };
    }

    return {
        error: null,
    };
};

const validParkNewCarParam = (carNumber) => {
    if (!carNumber) {
        return {
            error: 'Car number is null or empty. Please check again!',
        };
    }

    if (!isString(carNumber)) {
        return {
            error: 'Car number is not string. Please check again!',
        };
    }

    return {
        error: null,
    };
};

const validLeaveCarParams = (carNumber, parkedHour) => {
    if (!carNumber) {
        return {
            error: 'Car number is null or empty. Please check again!',
        };
    }

    if (!parkedHour) {
        return {
            error: 'Parked hour is null or empty. Please check again!',
        };
    }

    if (!isString(carNumber)) {
        return {
            error: 'Car number is not string. Please check again!',
        };
    }

    if (!isString(parkedHour)) {
        return {
            error: 'Parked hour is not string. Please check again!',
        };
    }

    return {
        error: null,
    };
};

module.exports = {
    validLeaveCarParams,
    validParkNewCarParam,
    validInitParkinglotParam,
};