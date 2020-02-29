const sinon = require('sinon');
const mocha = require('mocha');
const chai = require('chai');
const expect = chai.expect;
const fs = require('fs');

const { readTextFile } = require('../file_util');

describe('readTextFile', () => {
    let readFileSyncStub;

    beforeEach(() => {
        readFileSyncStub = sinon.stub(fs, 'readFileSync');
    });

    afterEach(() => {
        readFileSyncStub.restore();
    });

    it('should return null value when fileName is null', () => {
        const fileNameValue = null;

        const content = readTextFile(fileNameValue);

        expect(content).to.be.null;
    });

    it('should return null value when fileName is not string', () => {
        const fileNameValue = 1;

        const content = readTextFile(fileNameValue);

        expect(content).to.be.null;
    });

    it('should call function once', () => {
        const fileNameValue = 'data.txt';
        const mockContent = null;

        readFileSyncStub.returns(mockContent);

        readTextFile(fileNameValue);

        expect(readFileSyncStub.calledOnceWith(fileNameValue)).to.be.true;
    });


    it('should call function once', () => {
        const fileNameValue = 'data.txt';
        const mockError = new Error('Cant read file');

        readFileSyncStub.throws(mockError);

        const content = readTextFile(fileNameValue);

        expect(content).to.be.null;
    });

    it('should return string value when contentFile is not null', () => {
        const fileNameValue = 'data.txt';
        const mockContent = 'value';

        readFileSyncStub.returns(mockContent);

        const content = readTextFile(fileNameValue);

        expect(content).to.be.not.empty;
        expect(content).to.be.equal(mockContent);
    });

    it('should return null when contentFile is null', () => {
        const fileNameValue = 'data.txt';
        const mockContent = null;

        readFileSyncStub.returns(mockContent);

        const content = readTextFile(fileNameValue);

        expect(content).to.be.null;
    });

    it('should return null when type of contentFile is not string', () => {
        const fileNameValue = 'data.txt';
        const mockContent = 0;

        readFileSyncStub.returns(mockContent);

        const content = readTextFile(fileNameValue);

        expect(content).to.be.not.string;
    });
});