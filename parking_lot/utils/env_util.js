
const readFileNameFromArgvs = () => {
    const { length } = process.argv;
    if (!length || length < 3) {
        return null;
    }

    return process.argv[2];
};
module.exports = {
    readFileNameFromArgvs,
};