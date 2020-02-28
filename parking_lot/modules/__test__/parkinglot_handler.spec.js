const sinon = require('sinon');
const mocha = require('mocha');
const chai = require('chai');
const expect = chai.expect;

const store = require('../../store');
const { ParkinglotRepo } = require('../parkinglot_repo');
const { ParkinglotHandler } = require('../parkinglot_handler');

describe('ParkinglotHandler', () => {
    let context, parkinglotRepo, parkinglotRepoStub, parkinglotHandler;

    beforeEach(() => {
        parkinglotRepo = new ParkinglotRepo(store);
        parkinglotHandler = new ParkinglotHandler(parkinglotRepo);
    });

    afterEach(() => {
        parkinglotRepoStub.restore();
    });

    after(() => {
        ParkinglotRepo.instance = null;
        ParkinglotHandler.instance = null;
    });

    describe('responseInitParkinglot', () => {

        it('should return error when get error from layout repo', () => {
            const mockError = 'mockError';

            parkinglotRepoStub = sinon.stub(parkinglotRepo, 'initParkingLot').returns({
                error: mockError,
            });


            const { error } = parkinglotHandler.responseInitParkinglot(context, {
                slotTotal: {},
            });

            expect(error).to.be.equal(mockError);
        });

        it('should return response is true when received isInitSuccess is true', () => {
            const mockIsInitSuccess = true;

            parkinglotRepoStub = sinon.stub(parkinglotRepo, 'initParkingLot').returns({
                isInitSuccess: mockIsInitSuccess,
            });
            const { response } = parkinglotHandler.responseInitParkinglot(context, {
                slotTotal: {},
            });

            expect(response).to.be.equal(mockIsInitSuccess);
        });

        it('should return response is false when received isInitSuccess is false', () => {
            const mockIsInitSuccess = false;

            parkinglotRepoStub = sinon.stub(parkinglotRepo, 'initParkingLot').returns({
                isInitSuccess: mockIsInitSuccess,
            });
            const { response } = parkinglotHandler.responseInitParkinglot(context, {
                slotTotal: {},
            });

            expect(response).to.be.equal(mockIsInitSuccess);
        });
    });

    describe('responseParkNewCar', () => {

        it('should return error when get error from layout repo', () => {
            const mockError = 'mockError';

            parkinglotRepoStub = sinon.stub(parkinglotRepo, 'parkNewCar').returns({
                error: mockError,
            });


            const { error } = parkinglotHandler.responseParkNewCar(context, {
                carNumber: {},
            });

            expect(error).to.be.equal(mockError);
        });

        it('should return response is index of carNumber when inserted on parkinglot', () => {
            const index = 0;

            parkinglotRepoStub = sinon.stub(parkinglotRepo, 'parkNewCar').returns({
                indexCarNumberAppend: index,
            });
            const { response } = parkinglotHandler.responseParkNewCar(context, {
                carNumber: {},
            });

            expect(response).to.be.equal(index);
        });
    });

    describe('responseGetStatusParkingLot', () => {

        it('should return error when get error from layout repo', () => {
            const mockError = 'mockError';

            parkinglotRepoStub = sinon.stub(parkinglotRepo, 'getStatusParkingLot').returns({
                error: mockError,
            });


            const { error } = parkinglotHandler.responseGetStatusParkingLot(context);

            expect(error).to.be.equal(mockError);
        });

        it('should return response is carNumbers when inserted on parkinglot', () => {
            const carNumbers = ['carNumber1', 'carNumber2'];

            parkinglotRepoStub = sinon.stub(parkinglotRepo, 'getStatusParkingLot').returns({
                carNumbers,
            });
            const { response } = parkinglotHandler.responseGetStatusParkingLot(context);

            expect(response).to.be.equal(carNumbers);
        });
    });

    describe('responseLeaveCar', () => {

        it('should return error when get error from layout repo', () => {
            const mockError = 'mockError';

            parkinglotRepoStub = sinon.stub(parkinglotRepo, 'leaveCar').returns({
                error: mockError,
            });


            const { error } = parkinglotHandler.responseLeaveCar(context, {
                carNumber: {},
                parkedHour: {},
            });

            expect(error).to.be.equal(mockError);
        });

        it('should return response is index of car when removed and price on parkinglot', () => {
            const expectedResponse = {
                indexCarRemoved: 0,
                price: 40,
            };

            parkinglotRepoStub = sinon.stub(parkinglotRepo, 'leaveCar').returns(expectedResponse);
            const { response } = parkinglotHandler.responseLeaveCar(context, {
                carNumber: 'carNumber',
                parkedHour: '5',
            });

            expect(response).to.deep.equal(expectedResponse);
        });
    });
});