const sinon = require('sinon');
const mocha = require('mocha');
const chai = require('chai');
const expect = chai.expect;

const ParkinglotTransport = require('../parkinglot_transport');
const parkingLotRoute = require('../parkinglot_route');

const { PARKING_ACTION_TYPE, } = require('../../type');

describe('ParkinglotTransport', () => {
    let context, parkinglotTransport;

    before(() => {
        parkinglotTransport = new ParkinglotTransport();
    });

    after(() => {
        ParkinglotTransport.instance = null;
    });

    it('should call initParkingLot when route is create_parking_lot', () => {
        const route = PARKING_ACTION_TYPE.CREATE;
        const expectResponse = 'data';

        const initParkingLotStub = sinon.stub(parkinglotTransport, 'initParkingLot').returns(expectResponse);

        const response = parkingLotRoute[route]({ data: {} });

        expect(initParkingLotStub.calledOnce).to.be.true;
        expect(response).to.be.equals(expectResponse);
    });

    it('should call getStatus when route is status', () => {
        const route = PARKING_ACTION_TYPE.CHECK_STATUS;
        const expectResponse = 'data';

        const getStatusStub = sinon.stub(parkinglotTransport, 'getStatus').returns(expectResponse);

        const response = parkingLotRoute[route]({ data: {} });

        expect(getStatusStub.calledOnce).to.be.true;
        expect(response).to.be.equals(expectResponse);
    });

    it('should call leaveCar when route is leave', () => {
        const route = PARKING_ACTION_TYPE.REMOVE;
        const expectResponse = 'data';

        const leaveCarStub = sinon.stub(parkinglotTransport, 'leaveCar').returns(expectResponse);

        const response = parkingLotRoute[route]({ data: {} });

        expect(leaveCarStub.calledOnce).to.be.true;
        expect(response).to.be.equals(expectResponse);
    });

    it('should call parkNewCar when route is park', () => {
        const route = PARKING_ACTION_TYPE.APPEND;
        const expectResponse = 'data';

        const parkNewCarStub = sinon.stub(parkinglotTransport, 'parkNewCar').returns(expectResponse);

        const response = parkingLotRoute[route]({ data: {} });

        expect(parkNewCarStub.calledOnce).to.be.true;
        expect(response).to.be.equals(expectResponse);
    });
});