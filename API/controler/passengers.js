const passengersModels = require('../models/passengers');


const getPassengers = async (obj) => {
    let passengerData = await passengersModels.getPassengers(obj);
    return passengerData;
}


const addPassengers = async (obj) => {
    let passengerData = await passengersModels.addPassengers(obj);
    return passengerData;
}

const updatePassengers = async (obj) => {
    let body = {};

    if (obj.name)
        body.name = obj.name;
    if (obj.email)
        body.email = obj.email;
    if (obj.requires_wheelchair)
        body.requires_wheelchair = obj.requires_wheelchair;
    if (obj.has_infant)
        body.has_infant = obj.has_infant;
    if (obj.passport)
        body.passport = obj.passport;
    if (obj.address)
        body.address = obj.address;
    if (obj.date_of_birth)
        body.date_of_birth = obj.date_of_birth;

    let passengerData = await passengersModels.updatePassengers(obj.id, obj);
    return passengerData;
}

module.exports = { getPassengers, addPassengers, updatePassengers }