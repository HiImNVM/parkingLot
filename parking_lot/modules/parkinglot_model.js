

const validInitParkinglotParam = (slotNumber) => {
    if (!slotNumber) {
        return {
            error: 'Slot is null or empty. Please check again!',
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

    return {
        error: null,
    };
};

module.exports = {
    validLeaveCarParams,
    validParkNewCarParam,
    validInitParkinglotParam,
};