const { IParkinglotStorage } = require('./parkinglot_storage');
const { ErrorStore, ErrorExistData, ErrorMaximum, ErrorInvalidRequest, } = require('../models/customError_model');
const { calculateParkCar, } = require('../utils/price_util');

class IParkinglotRepo {
    initParkingLot(context, { slotTotal }) { }
    parkNewCar(context, { carNumber }) { }
    getStatusParkingLot(context) { }
    leaveCar(context, { carNumber, parkedHour }) { }
}

class ParkinglotRepo extends IParkinglotRepo {
    constructor(parkinglotStorage) {
        super();

        if (!ParkinglotRepo.instance) {
            ParkinglotRepo.instance = this;
        }

        if (parkinglotStorage instanceof IParkinglotStorage) {
            this.parkinglotStorage = parkinglotStorage;
        }

        return ParkinglotRepo.instance;
    }


    initParkingLot(context, { slotTotal }) {
        const slotTotalInt = parseInt(slotTotal);

        const { error: errorCreateNewParkingLot, data } = this.parkinglotStorage.createNewParkingLot(context, {
            slotTotal: slotTotalInt,
        });

        if (errorCreateNewParkingLot) {
            return {
                error: new ErrorStore(errorCreateNewParkingLot),
            };
        }

        return {
            isInitSuccess: data,
        }
    }

    parkNewCar(context, { carNumber }) {
        const { error: errorIsFullSizeOfParkingLot, data: isMaximumSlot } = this.parkinglotStorage.isFullSizeOfParkingLot(context);
        if (errorIsFullSizeOfParkingLot) {
            return {
                error: new ErrorStore(errorIsFullSizeOfParkingLot),
            };
        }

        if (isMaximumSlot) {
            return {
                error: new ErrorMaximum('Sorry, parking lot is full'),
            };
        }

        const { error: errorCheckExistCarNumber, data: isExistCarNumber } = this.parkinglotStorage.checkExistCarNumber(context, {
            carNumber,
        });
        if (errorCheckExistCarNumber) {
            return {
                error: new ErrorStore(errorCheckExistCarNumber),
            };
        }

        if (isExistCarNumber) {
            return {
                error: new ErrorExistData(`${carNumber} is exist. Please check again!`),
            };
        }

        const { error: errorInsertNewCarToParkingLot, data: indexCarNumberAppend } = this.parkinglotStorage.insertNewCarToParkingLot(context, {
            carNumber,
        });
        if (errorInsertNewCarToParkingLot) {
            return {
                error: new ErrorStore(errorInsertNewCarToParkingLot),
            };
        }

        return {
            indexCarNumberAppend,
        };
    }

    getStatusParkingLot(context) {
        const { error: errorGetAllCarNumberOnParkingLot, data: carNumbers } = this.parkinglotStorage.getAllCarNumberOnParkingLot(context);
        if (errorGetAllCarNumberOnParkingLot) {
            return {
                error: new ErrorStore(errorGetAllCarNumberOnParkingLot),
            };
        }

        return {
            carNumbers,
        };
    }

    leaveCar(context, { carNumber, parkedHour }) {
        const { error: errorCheckExistCarNumber, data: isExistCarNumber } = this.parkinglotStorage.checkExistCarNumber(context, {
            carNumber,
        });

        if (errorCheckExistCarNumber) {
            return {
                error: new ErrorStore(errorCheckExistCarNumber),
            };
        }

        if (!isExistCarNumber) {
            return {
                error: new ErrorExistData(`Registration number ${carNumber} not found`),
            };
        }

        const { error: errorRemoveCarFormParkingLotByCarNumber, data: indexCarRemoved } = this.parkinglotStorage.removeCarFormParkingLotByCarNumber(context, {
            carNumber,
        });

        if (errorRemoveCarFormParkingLotByCarNumber) {
            return {
                error: new ErrorStore(errorRemoveCarFormParkingLotByCarNumber),
            };
        }

        const parkedHourInt = parseInt(parkedHour);
        const priceParkCar = calculateParkCar(parkedHourInt);
        if (!priceParkCar) {
            return {
                error: new ErrorInvalidRequest('Parked hour is wrong. Please check again!'),
            }
        }

        return {
            indexCarRemoved,
            price: priceParkCar,
        };
    }
}



module.exports = {
    ParkinglotRepo,
    IParkinglotRepo,
};