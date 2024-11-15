

const auth = require('./auth');
const flights = require('./flights');
const seats = require('./seats');
const passengers = require('./passengers');
const ancillary_services = require('./ancillary_services');
const meal_preferences = require('./meal_preferences');

module.exports = { auth, flights, seats, passengers, ancillary_services, meal_preferences }