const sinon = require('sinon');
const mocha = require('mocha');
const chai = require('chai');
const expect = chai.expect;

const { readFileNameFromArgvs, } = require('../env_util');

describe('readFileNameFromArgvs', () => {
    it('should return null when length less more 3', () => {
        const stubValue = 0;

        sinon.stub(process.argv, 'length').value(stubValue);
        const fileName = readFileNameFromArgvs();

        expect(fileName).to.be.null;
    });

    it('should return string value when argv[2] is exist value', () => {
        const stubValue = 'data.txt';

        sinon.stub(process, 'argv').value([, , stubValue]);
        const fileName = readFileNameFromArgvs();

        expect(fileName).to.be.string;
        expect(fileName).to.equal(stubValue);
    });
});