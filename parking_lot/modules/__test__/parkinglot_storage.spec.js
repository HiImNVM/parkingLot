const sinon = require('sinon');
const mocha = require('mocha');
const chai = require('chai');
const expect = chai.expect;

const store = require('../../store');
const { ParkinglotStorage } = require('../parkinglot_storage');

describe('ParkinglotStorage', () => {
    let context, db, parkinglotStorage;

    beforeEach(() => {
        db = store;
        parkinglotStorage = new ParkinglotStorage(db);
    });

    describe('createNewParkingLot', () => {
        it('should return error when dont have store', () => {
            db.parkinglot = null;

            const { error } = parkinglotStorage.createNewParkingLot(context, {
                slotTotal: {}
            });

            expect(error).to.be.string;
            expect(error).to.be.equal('Not found store. Please check again!');
        });

        it('should return true when created success new slots on parkinglot', () => {
            const slotTotal = 6;
            db.parkinglot = {};

            const { data } = parkinglotStorage.createNewParkingLot(context, {
                slotTotal,
            });

            expect(data).to.be.true;
            expect(db.parkinglot.slots).to.have.lengthOf(6);
        });
    });

    describe('insertNewCarToParkingLot', () => {
        it('should return error when dont have store', () => {
            db.parkinglot = null;

            const { error } = parkinglotStorage.insertNewCarToParkingLot(context, {
                carNumber: {}
            });

            expect(error).to.be.string;
            expect(error).to.be.equal('Not found store. Please check again!');
        });

        it('should return error when slots is null on parkinglot', () => {
            db.parkinglot = {
                slots: null,
            };

            const { error } = parkinglotStorage.insertNewCarToParkingLot(context, {
                carNumber: {},
            });

            expect(error).to.be.string;
            expect(error).to.be.equal('Not found slot on parkinglot');
        });

        it('should return index of new car when inserted on parkinglot', () => {
            const carNumber = 'slot2';
            db.parkinglot = {
                slots: ['slot1', null, 'slot3'],
            };

            const { data } = parkinglotStorage.insertNewCarToParkingLot(context, {
                carNumber,
            });

            expect(data).to.be.equal(1);
            expect(db.parkinglot.slots).to.have.lengthOf(3);
            expect(db.parkinglot.slots[1]).to.equal(carNumber);
        });
    });

    describe('isFullSizeOfParkingLot', () => {
        it('should return error when dont have store', () => {
            db.parkinglot = null;

            const { error } = parkinglotStorage.isFullSizeOfParkingLot(context);

            expect(error).to.be.string;
            expect(error).to.be.equal('Not found store. Please check again!');
        });

        it('should return error when slots is null on parkinglot', () => {
            db.parkinglot = {
                slots: null,
            };

            const { error } = parkinglotStorage.isFullSizeOfParkingLot(context);

            expect(error).to.be.string;
            expect(error).to.be.equal('Not found slot on parkinglot');
        });

        it('should return true when full slot on parkinglot', () => {
            db.parkinglot = {
                slots: ['slot1'],
            };

            const { data } = parkinglotStorage.isFullSizeOfParkingLot(context);

            expect(data).to.be.true;
        });

        it('should return false when have slot on parkinglot', () => {
            db.parkinglot = {
                slots: ['slot1', null],
            };

            const { data } = parkinglotStorage.isFullSizeOfParkingLot(context);

            expect(data).to.be.false;
        });
    });

    describe('checkExistCarNumber', () => {
        it('should return error when dont have store', () => {
            db.parkinglot = null;

            const { error } = parkinglotStorage.checkExistCarNumber(context, {
                carNumber: {},
            });

            expect(error).to.be.string;
            expect(error).to.be.equal('Not found store. Please check again!');
        });

        it('should return error when slots is null on parkinglot', () => {
            db.parkinglot = {
                slots: null,
            };

            const { error } = parkinglotStorage.checkExistCarNumber(context, {
                carNumber: {},
            });

            expect(error).to.be.string;
            expect(error).to.be.equal('Not found slot on parkinglot');
        });

        it('should return true when exist carNumber on parkinglot', () => {
            const carNumber = 'slot1';
            db.parkinglot = {
                slots: [carNumber],
            };

            const { data } = parkinglotStorage.checkExistCarNumber(context, {
                carNumber,
            });

            expect(data).to.be.true;
        });

        it('should return false when not exist carNumber on parkinglot', () => {
            const carNumber = 'slot2';
            db.parkinglot = {
                slots: ['slost1', null],
            };

            const { data } = parkinglotStorage.checkExistCarNumber(context, {
                carNumber,
            });

            expect(data).to.be.false;
        });
    });

    describe('getAllCarNumberOnParkingLot', () => {
        it('should return error when dont have store', () => {
            db.parkinglot = null;

            const { error } = parkinglotStorage.getAllCarNumberOnParkingLot(context);

            expect(error).to.be.string;
            expect(error).to.be.equal('Not found store. Please check again!');
        });

        it('should return error when slots is null on parkinglot', () => {
            db.parkinglot = {
                slots: null,
            };

            const { error } = parkinglotStorage.getAllCarNumberOnParkingLot(context);

            expect(error).to.be.string;
            expect(error).to.be.equal('Not found slot on parkinglot');
        });

        it('should return empty when not have car on parkinglot', () => {
            db.parkinglot = {
                slots: [],
            };

            const { data } = parkinglotStorage.getAllCarNumberOnParkingLot(context);

            expect(data).to.have.lengthOf(0);
        });

        it('should return all carNumber on parkinglot', () => {
            const slots = ['slost1', 'slot2']
            db.parkinglot = {
                slots,
            };

            const { data } = parkinglotStorage.getAllCarNumberOnParkingLot(context);

            expect(data).to.have.lengthOf(2);
            expect(data).to.have.equals(slots);
        });
    });

    describe('removeCarFormParkingLotByCarNumber', () => {
        it('should return error when dont have store', () => {
            db.parkinglot = null;

            const { error } = parkinglotStorage.removeCarFormParkingLotByCarNumber(context, {
                carNumber: {},
            });

            expect(error).to.be.string;
            expect(error).to.be.equal('Not found store. Please check again!');
        });

        it('should return error when slots is null on parkinglot', () => {
            db.parkinglot = {
                slots: null,
            };

            const { error } = parkinglotStorage.removeCarFormParkingLotByCarNumber(context, {
                carNumber: {},
            });

            expect(error).to.be.string;
            expect(error).to.be.equal('Not found slot on parkinglot');
        });

        it('should return index of carNumber when removed on parkinglot', () => {
            const carNumber = 'slot1';
            db.parkinglot = {
                slots: [carNumber],
            };

            const { data } = parkinglotStorage.removeCarFormParkingLotByCarNumber(context, {
                carNumber,
            });

            expect(data).to.be.equals(0);
            expect(db.parkinglot.slots[0]).to.be.null;
        });
    });
});