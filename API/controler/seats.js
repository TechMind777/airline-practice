const seatsModels = require('../models/seats.js');
const passengersModels = require('../models/passengers.js');


const getSeats = async (obj) => {
    let sheatsData = await seatsModels.getSeats(obj);
    return sheatsData;
}

const addSeat = async (obj) => {
    try {


        console.log(">>s")


        let pRes = await passengersModels.addPassengers({
            name: obj.name,
            email: obj.email,
            requires_wheelchair: obj.requires_wheelchair,
            has_infant: obj.has_infant,
        })
        console.log(">>1", pRes)

        console.log('...', pRes)
        let sheatsData = await seatsModels.addSeats({
            flight_id: obj.flight_id,
            seat_number: obj.seat_number,
            is_checked_in: 0,
            passenger_id: pRes,
        });
        console.log(">>")
        return sheatsData;
    } catch (error) {
        throw new Error(error.message | "Fail book seat");
    }
}

const updateSeat = async (obj) => {
    try {

        let pRes = await seatsModels.updateSeats(
            obj.seat_id,
            { 
                ancillary_services: obj.ancillary_services,
                meal_preferences: obj.meal_preferences,
                shop_requests: obj.shop_requests ? 1 : 0,

            }); 
        return pRes;
    } catch (error) {
        throw new Error(error.message | "Fail book seat");
    }
}


const updateSeatNumber = async (obj) => {
    try {

        let pRes = await seatsModels.updateSeats(
            obj.seat_id,
            { 
                seat_number: obj.seat_number, 

            }); 
        return pRes;
    } catch (error) {
        throw new Error(error.message | "Fail book seat");
    }
}
module.exports = { getSeats, addSeat, updateSeat, updateSeatNumber }