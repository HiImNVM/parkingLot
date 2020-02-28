const { IParkinglotRepo } = require('./parkinglot_repo');

class ParkinglotHandler {
    constructor(parkinglotRepo) {
        if (!ParkinglotHandler.instance) {
            ParkinglotHandler.instance = this;
        }

        if (parkinglotRepo instanceof IParkinglotRepo) {
            this.parkinglotRepo = parkinglotRepo;
        }

        return ParkinglotHandler.instance;
    }

    responseInitParkinglot(context, { slotTotal }) {
        const { error: errorInitParkingLot, isInitSuccess } = this.parkinglotRepo.initParkingLot(context, {
            slotTotal,
        });

        if (errorInitParkingLot) {
            return { error: errorInitParkingLot };
        }

        return {
            response: isInitSuccess,
        };
    }

    responseParkNewCar(context, { carNumber }) {
        const { error: errorParkNewCar, indexCarNumberAppend } = this.parkinglotRepo.parkNewCar(context, {
            carNumber,
        });

        if (errorParkNewCar) {
            return { error: errorParkNewCar };
        }

        return {
            response: indexCarNumberAppend,
        };
    }

    responseGetStatusParkingLot(context) {
        const { error: errorGetStatusParkingLot, carNumbers } = this.parkinglotRepo.getStatusParkingLot(context);

        if (errorGetStatusParkingLot) {
            return { error: errorGetStatusParkingLot };
        }

        return {
            response: carNumbers,
        };
    }

    responseLeaveCar(context, { carNumber, parkedHour }) {
        const { error: errorLeaveCar, indexCarRemoved, price } = this.parkinglotRepo.leaveCar(context, { carNumber, parkedHour });

        if (errorLeaveCar) {
            return { error: errorLeaveCar };
        }

        return {
            response: {
                indexCarRemoved,
                price,
            },
        };
    }
}

module.exports = { ParkinglotHandler };