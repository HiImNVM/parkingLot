const ParkinglotTransport = require('./parkinglot_transport');

const {
    PARKING_ACTION_TYPE,
} = require('../type');


const parkinglotTransport = new ParkinglotTransport();

module.exports = {
    [PARKING_ACTION_TYPE.CREATE]: (req) => parkinglotTransport.initParkingLot(req),
    [PARKING_ACTION_TYPE.CHECK_STATUS]: (req) => parkinglotTransport.getStatus(req),
    [PARKING_ACTION_TYPE.REMOVE]: (req) => parkinglotTransport.leaveCar(req),
    [PARKING_ACTION_TYPE.APPEND]: (req) => parkinglotTransport.parkNewCar(req),
};
