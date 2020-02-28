const sinon = require('sinon');
const mocha = require('mocha');
const chai = require('chai');
const expect = chai.expect;

const { sanitizeTextInLine, } = require('../string_util');

describe('sanitizeTextInLine', () => {
    it('should return null when rawText is null', () => {
        const stubValue = null;

        const sanitizedText = sanitizeTextInLine(stubValue);

        expect(sanitizedText).to.be.null;
    });

    it('should return null when rawText is not string', () => {
        const stubValue = 0;

        const sanitizedText = sanitizeTextInLine(stubValue);

        expect(sanitizedText).to.be.not.string;
    });

    it('should remove space left and right of text when rawText not null', () => {
        const stubValue = ' abc  ';
        const expectedValue = 'abc';

        const sanitizedText = sanitizeTextInLine(stubValue);

        expect(sanitizedText).to.be.equal(expectedValue);
    });
});