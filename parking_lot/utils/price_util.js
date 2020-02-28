const { isNumber, } = require('util');

const calculateParkCar = (hour) => {
    if (hour === null || !isNumber(hour) || hour < 0) {
        return null;
    }

    if (hour === 0) {
        return 0;
    }

    if (hour < 3) {
        return 10;
    }

    return ((hour - 2) * 10) + 10;
}

module.exports = {
    calculateParkCar,
};