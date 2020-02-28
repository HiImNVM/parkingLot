const sinon = require('sinon');
const mocha = require('mocha');
const chai = require('chai');
const expect = chai.expect;

const store = require('../../store');
const { ParkinglotStorage } = require('../parkinglot_storage');
const { ParkinglotRepo } = require('../parkinglot_repo');
const { ErrorStore, ErrorMaximum, ErrorExistData, ErrorInvalidRequest } = require('../../models/customError_model');

describe('ParkinglotRepo', () => {

    let db, parkinglotStorage, context;

    beforeEach(() => {
        context = null;
        db = store
        parkinglotStorage = new ParkinglotStorage(db);
    });

    after(() => {
        ParkinglotStorage.instance = null;
        ParkinglotRepo.instance = null;
    });

    describe('initParkingLot', () => {
        it('should return error when dont have store', () => {
            db.parkinglot = null;

            const { error, } = new ParkinglotRepo(parkinglotStorage).initParkingLot(context, { slotTotal: {} });

            expect(error).to.be.instanceOf(ErrorStore);
        });

        it('should isInitSuccess is true when slotTotal have value', () => {
            const slotTotal = '6';
            db.parkinglot = {};
            const expectedValue = true;

            const { isInitSuccess, } = new ParkinglotRepo(parkinglotStorage).initParkingLot(context, {
                slotTotal,
            });

            expect(isInitSuccess).to.be.equal(expectedValue);
        });
    });

    describe('parkNewCar', () => {
        it('should return error when dont have store', () => {
            db.parkinglot = null;

            const { error, } = new ParkinglotRepo(parkinglotStorage).parkNewCar(context, {
                slotTotal: {},
            });

            expect(error).to.be.instanceOf(ErrorStore);
        });

        it('should return error when full slot on parkinglot', () => {
            const carNumber = 'carNumber';
            db.parkinglot = {
                slots: ['slot1'],
            };

            const { error, } = new ParkinglotRepo(parkinglotStorage).parkNewCar(context, {
                carNumber,
            });

            expect(error).to.be.instanceOf(ErrorMaximum);
        });

        it('should return error when carNumber is exist on parkinglot', () => {
            const carNumber = 'carNumber';
            db.parkinglot = {
                slots: [carNumber, null],
            };

            const { error, } = new ParkinglotRepo(parkinglotStorage).parkNewCar(context, {
                carNumber,
            });

            expect(error).to.be.instanceOf(ErrorExistData);
        });

        it('should return index of CarNumber when append', () => {
            db.parkinglot = {
                slots: ['slot1', null],
            };

            const { indexCarNumberAppend, } = new ParkinglotRepo(parkinglotStorage).parkNewCar(context, {
                carNumber: 'slot2',
            });

            expect(indexCarNumberAppend).to.be.equal(1);
        });
    });

    describe('getStatusParkingLot', () => {
        it('should return error when dont have store', () => {
            db.parkinglot = null;

            const { error, } = new ParkinglotRepo(parkinglotStorage).getStatusParkingLot(context);

            expect(error).to.be.instanceOf(ErrorStore);
        });

        it('should return carNumbers', () => {
            const slots = ['slot1', 'slot2', 'slot3'];
            db.parkinglot = {
                slots,
            };

            const { carNumbers, } = new ParkinglotRepo(parkinglotStorage).getStatusParkingLot(context);

            expect(carNumbers).to.have.lengthOf(slots.length);
        });
    });

    describe('leaveCar', () => {
        it('should return error when dont have store', () => {
            db.parkinglot = null;

            const { error, } = new ParkinglotRepo(parkinglotStorage).leaveCar(context, {});

            expect(error).to.be.instanceOf(ErrorStore);
        });

        it('should return error when carNumber is not exist on parkinglot', () => {
            const slots = ['slot1'];
            db.parkinglot = {
                slots,
            };

            const { error, } = new ParkinglotRepo(parkinglotStorage).leaveCar(context, {
                carNumber: 'slot2',
                parkedHour: '5',
            });

            expect(error).to.be.instanceOf(ErrorExistData);
        });

        it('should return error when parkedHour is less more 0', () => {
            const slots = ['slot1'];
            db.parkinglot = {
                slots,
            };

            const { error, } = new ParkinglotRepo(parkinglotStorage).leaveCar(context, {
                carNumber: 'slot1',
                parkedHour: '-1',
            });

            expect(error).to.be.instanceOf(ErrorInvalidRequest);
        });

        it('should return index of car when removed and calculate price depend on parked hours', () => {
            const carNumber = 'slot1';
            const parkedHour = 5;
            db.parkinglot = {
                slots: [carNumber],
            };

            const { indexCarRemoved, price, } = new ParkinglotRepo(parkinglotStorage).leaveCar(context, {
                carNumber,
                parkedHour,
            });

            expect(indexCarRemoved).to.be.equal(0);
            expect(price).to.be.equal(40);
        });
    });
});