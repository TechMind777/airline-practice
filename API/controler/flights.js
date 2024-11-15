const flightsModels = require('../models/flights');


const getFlights = async (obj) => {
    let flightsData = await flightsModels.getFlights(obj); 
        return flightsData;
}

module.exports = { getFlights }