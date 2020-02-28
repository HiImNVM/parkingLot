const { isNull, } = require('util');
class IParkinglotStorage {
    createNewParkingLot(context, { slotTotal }) { }

    insertNewCarToParkingLot(context, { carNumber }) { }

    isFullSizeOfParkingLot(context) { }

    checkExistCarNumber(context, { carNumber }) { }

    getAllCarNumberOnParkingLot(context) { }

    removeCarFormParkingLotByCarNumber(context, { carNumber }) { }
}

const TABLE_NAME = 'parkinglot';
class ParkinglotStorage extends IParkinglotStorage {
    constructor(db) {
        super();

        if (!ParkinglotStorage.instance) {
            ParkinglotStorage.instance = this;
        }

        this.db = db;

        return ParkinglotStorage.instance;
    }

    createNewParkingLot(context, { slotTotal }) {
        const parkinglotStore = this.db[TABLE_NAME];
        if (!parkinglotStore) {
            return {
                error: 'Not found store. Please check again!',
            };
        }

        parkinglotStore.slots = new Array(slotTotal);

        return {
            data: true,
        };
    }

    insertNewCarToParkingLot(context, { carNumber }) {
        const parkinglotStore = this.db[TABLE_NAME];
        if (!parkinglotStore) {
            return {
                error: 'Not found store. Please check again!',
            };
        }

        const { slots } = parkinglotStore;
        if (isNull(slots)) {
            return {
                error: 'Not found slot on parkinglot',
            };
        }

        const indexElementEmtpy = slots.findIndex(item => item == null);
        slots[indexElementEmtpy] = carNumber;

        return {
            data: indexElementEmtpy,
        };
    }

    isFullSizeOfParkingLot(context) {
        const parkinglotStore = this.db[TABLE_NAME];
        if (!parkinglotStore) {
            return {
                error: 'Not found store. Please check again!',
            };
        }

        const { slots } = parkinglotStore;
        if (isNull(slots)) {
            return {
                error: 'Not found slot on parkinglot',
            };
        }

        const indexElementEmtpy = slots.findIndex(item => item == null);

        return {
            data: indexElementEmtpy === -1,
        };
    }

    checkExistCarNumber(context, { carNumber }) {
        const parkinglotStore = this.db[TABLE_NAME];
        if (!parkinglotStore) {
            return {
                error: 'Not found store. Please check again!',
            };
        }

        const { slots } = parkinglotStore;
        if (isNull(slots)) {
            return {
                error: 'Not found slot on parkinglot',
            };
        }

        const isExistCarNumber = slots.indexOf(carNumber);

        return {
            data: isExistCarNumber > -1,
        };
    }

    getAllCarNumberOnParkingLot(context) {
        const parkinglotStore = this.db[TABLE_NAME];
        if (!parkinglotStore) {
            return {
                error: 'Not found store. Please check again!',
            };
        }

        const { slots } = parkinglotStore;
        if (isNull(slots)) {
            return {
                error: 'Not found slot on parkinglot',
            };
        }

        return {
            data: slots,
        };
    }

    removeCarFormParkingLotByCarNumber(context, { carNumber }) {
        const parkinglotStore = this.db[TABLE_NAME];
        if (!parkinglotStore) {
            return {
                error: 'Not found store. Please check again!',
            };
        }

        const { slots } = parkinglotStore;
        if (isNull(slots)) {
            return {
                error: 'Not found slot on parkinglot',
            };
        }

        const indexExistCarNumber = slots.indexOf(carNumber);
        slots[indexExistCarNumber] = null;

        return {
            data: indexExistCarNumber,
        }
    }
}


module.exports = {
    ParkinglotStorage,
    IParkinglotStorage,
}