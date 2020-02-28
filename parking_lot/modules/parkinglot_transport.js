const { ParkinglotHandler } = require('./parkinglot_handler');
const { ParkinglotRepo } = require('./parkinglot_repo');
const { ParkinglotStorage } = require('./parkinglot_storage');
const {
    validInitParkinglotParam,
    validParkNewCarParam,
    validLeaveCarParams,
} = require('./parkinglot_model');

const {
    INFO_OF_CAR_IN_PARKINGLOT,
    CREATE_SUCCESS_PARKINGLOT,
    ALLOCATED_SLOT_NUMBER,
    REGISTRATION_CAR_NUMBER_WITH_SLOT_FREE_CHARGE,
} = require('../constant');

const store = require('../store');

const {
    format,
} = require('util');

const { ErrorInvalidRequest } = require('../models/customError_model');

class ParkinglotTransport {
    constructor() {
        if (!ParkinglotTransport.instance) {
            ParkinglotTransport.instance = this;
        }

        return ParkinglotTransport.instance;
    }

    initParkingLot(req) {
        const {
            data: slotTotal,
        } = req;

        const {
            error: errorValidInitParkinglotParam,
        } = validInitParkinglotParam(slotTotal);
        if (errorValidInitParkinglotParam) {
            throw new ErrorInvalidRequest(errorValidInitParkinglotParam);
        }

        const context = null;
        const db = store;
        const storage = new ParkinglotStorage(db);
        const repo = new ParkinglotRepo(storage);
        const handler = new ParkinglotHandler(repo);

        const {
            error: errorResponseInitParkinglot,
            response: isInitSuccess,
        } = handler.responseInitParkinglot(context, {
            slotTotal,
        });

        if (errorResponseInitParkinglot) {
            throw errorResponseInitParkinglot;
        }

        if (isInitSuccess === null) {
            return null;
        }

        return format(CREATE_SUCCESS_PARKINGLOT, slotTotal);
    };

    parkNewCar(req) {
        const {
            data: carNumber,
        } = req;

        const { error: errorValidParkNewCarParam } = validParkNewCarParam(carNumber);
        if (errorValidParkNewCarParam) {
            throw new ErrorInvalidRequest(errorValidParkNewCarParam);
        }

        const context = null;
        const db = store;
        const storage = new ParkinglotStorage(db);
        const repo = new ParkinglotRepo(storage);
        const handler = new ParkinglotHandler(repo);

        const { error: errorResponseParkNewCar, response: indexCarNumberAppend } = handler.responseParkNewCar(context, {
            carNumber,
        });

        if (errorResponseParkNewCar) {
            throw errorResponseParkNewCar;
        }

        if (indexCarNumberAppend === null) {
            return null;
        }

        const realIndexCarNumberAppend = indexCarNumberAppend + 1;
        return format(ALLOCATED_SLOT_NUMBER, realIndexCarNumberAppend);
    };

    getStatus(req) {
        const context = null;
        const db = store;
        const storage = new ParkinglotStorage(db);
        const repo = new ParkinglotRepo(storage);
        const handler = new ParkinglotHandler(repo);

        const { error: errorResponseGetStatusParkingLot, response: carNumbers } = handler.responseGetStatusParkingLot(context);

        if (errorResponseGetStatusParkingLot) {
            throw errorResponseGetStatusParkingLot;
        }

        if (carNumbers === null) {
            return null;
        }

        const filteredCarNumbers = carNumbers.filter(Boolean);
        const formatedCarNumbers = filteredCarNumbers.map((carNumber, index) => {
            const realIndexCarNumber = index + 1;
            return format(INFO_OF_CAR_IN_PARKINGLOT, realIndexCarNumber, carNumber);
        });

        return ['Slot No. Registration No.', ...formatedCarNumbers];
    };

    leaveCar(req) {
        const {
            data: carNumber,
            rest,
        } = req;

        const [parkedHour] = rest;
        const { error: errorValidLeaveCarParams } = validLeaveCarParams(carNumber, parkedHour);
        if (errorValidLeaveCarParams) {
            throw new ErrorInvalidRequest(errorValidLeaveCarParams);
        }

        const context = null;
        const db = store;
        const storage = new ParkinglotStorage(db);
        const repo = new ParkinglotRepo(storage);
        const handler = new ParkinglotHandler(repo);

        const {
            error: errorResponseLeaveCar,
            response,
        } = handler.responseLeaveCar(context, {
            carNumber,
            parkedHour,
        });

        if (errorResponseLeaveCar) {
            throw errorResponseLeaveCar;
        }

        const { indexCarRemoved, price } = response;

        if (indexCarRemoved === null || price === null) {
            return null;
        }

        const realIndexCarRemoved = indexCarRemoved + 1;

        return format(REGISTRATION_CAR_NUMBER_WITH_SLOT_FREE_CHARGE, carNumber, realIndexCarRemoved, price);
    };

}

module.exports = ParkinglotTransport;