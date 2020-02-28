const sinon = require('sinon');
const mocha = require('mocha');
const chai = require('chai');
const expect = chai.expect;

const { calculateParkCar, } = require('../price_util');

describe('calculateParkCar', () => {
    it('should return null when hour is null', () => {
        const stubValue = null;

        const price = calculateParkCar(stubValue);

        expect(price).to.be.null;
    });

    it('should return null when hour is not number', () => {
        const stubValue = '1';

        const price = calculateParkCar(stubValue);

        expect(price).to.be.null;
    });

    it('should return null when hour less more 0', () => {
        const stubValue = -1;

        const price = calculateParkCar(stubValue);

        expect(price).to.be.null;
    });

    it('should return 0 when hour is 0', () => {
        const stubValue = 0;
        const expectedValue = 0;

        const price = calculateParkCar(stubValue);

        expect(price).to.be.equal(expectedValue);
    });

    it('should return 10 when hour less more 3', () => {
        const stubValue = 2;
        const expectedValue = 10;

        const price = calculateParkCar(stubValue);

        expect(price).to.be.equal(expectedValue);
    });

    it('should return 80 when hour is 5', () => {
        const stubValue = 5;
        const expectedValue = 40;

        const price = calculateParkCar(stubValue);

        expect(price).to.be.equal(expectedValue);
    });
});