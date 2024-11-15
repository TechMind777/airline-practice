const express = require('express');
const router = express.Router();

const flightsControler = require('../controler/flights');

router.get('/get-flights', async (req, res) => {
    try {
        const dateOnly =  req.query.departure_time ;

        let body = { 
        }
        if(dateOnly){
             body = {
                departure_time: dateOnly,
                departure_time_start: dateOnly + ' 00:00:00',
                departure_time_end: dateOnly+ ' 23:59:59'
            }
        }
        let result = await flightsControler.getFlights(body);

        res.status(200).json({ result: true, data: result });
    } catch (error) {
        res.status(401).json({ result: false, message: error.message || "Fail to login" });
    }

});

router.post('/signin', (req, res) => { });
router.post('/login', (req, res) => { });

module.exports = router;