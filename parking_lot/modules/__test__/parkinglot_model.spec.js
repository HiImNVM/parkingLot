const sinon = require('sinon');
const mocha = require('mocha');
const chai = require('chai');
const expect = chai.expect;

const {
    validInitParkinglotParam,
    validLeaveCarParams,
    validParkNewCarParam,
} = require('../parkinglot_model');

describe('', () => {
    describe('validInitParkinglotParam', () => {
        it('should return error when slotTotal is null', () => {
            const mockSlotTotal = null;
            const expectErrorMessage = 'Slot is null or empty. Please check again!';

            const { error } = validInitParkinglotParam(mockSlotTotal);

            expect(error).to.be.equals(expectErrorMessage);
        });

        it('should return error when slotTotal is not string', () => {
            const mockSlotTotal = 1;
            const expectErrorMessage = 'Slot is not string. Please check again!';

            const { error } = validInitParkinglotParam(mockSlotTotal);

            expect(error).to.be.equals(expectErrorMessage);
        });

        it('should return null when slotTotal is valid', () => {
            const mockSlotTotal = 'mockSlotToal';

            const { error } = validInitParkinglotParam(mockSlotTotal);

            expect(error).to.be.null;
        });
    });

    describe('validParkNewCarParam', () => {
        it('should return error when carNumber is null', () => {
            const mockCarNumber = null;
            const expectErrorMessage = 'Car number is null or empty. Please check again!';

            const { error } = validParkNewCarParam(mockCarNumber);

            expect(error).to.be.equals(expectErrorMessage);
        });

        it('should return error when carNumber is not string', () => {
            const mockCarNumber = 1;
            const expectErrorMessage = 'Car number is not string. Please check again!';

            const { error } = validParkNewCarParam(mockCarNumber);

            expect(error).to.be.equals(expectErrorMessage);
        });

        it('should return null when carNumber is valid', () => {
            const mockCarNumber = 'mockCarNumber';

            const { error } = validParkNewCarParam(mockCarNumber);

            expect(error).to.be.null;
        });
    });

    describe('validLeaveCarParams', () => {
        it('should return error when carNumber is null', () => {
            const mockCarNumber = null;

            const expectErrorMessage = 'Car number is null or empty. Please check again!';

            const { error } = validLeaveCarParams(mockCarNumber, null);

            expect(error).to.be.equals(expectErrorMessage);
        });

        it('should return error when parkedHour is null', () => {
            const mockCarNumber = 'mockCarNumber';
            const mockParkedHour = null;
            const expectErrorMessage = 'Parked hour is null or empty. Please check again!';

            const { error } = validLeaveCarParams(mockCarNumber, mockParkedHour);

            expect(error).to.be.equals(expectErrorMessage);
        });

        it('should return error when carNumber is not string', () => {
            const mockCarNumber = 1;
            const mockParkedHour = 'mockParkedHour';
            const expectErrorMessage = 'Car number is not string. Please check again!';

            const { error } = validLeaveCarParams(mockCarNumber, mockParkedHour);

            expect(error).to.be.equals(expectErrorMessage);
        });

        it('should return error when parkedHour is not string', () => {
            const mockParkedHour = 1;
            const mockCarNumber = 'mockCarNumber';
            const expectErrorMessage = 'Parked hour is not string. Please check again!';

            const { error } = validLeaveCarParams(mockCarNumber, mockParkedHour);

            expect(error).to.be.equals(expectErrorMessage);
        });

        it('should return null when carNumber and parkedHour have value', () => {
            const mockParkedHour = 'mockParkedHour';
            const mockCarNumber = 'mockCarNumber';

            const { error } = validLeaveCarParams(mockCarNumber, mockParkedHour);

            expect(error).to.be.null;
        });
    });
});