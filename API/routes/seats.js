const express = require('express');
const router = express.Router();

const seatsControler = require('../controler/seats');

router.get('/get-seats', async (req, res) => {
    try {

        let body = {
            flight_id: req.query.flight_id
        }
        let result = await seatsControler.getSeats(body);

        res.status(200).json({ result: true, data: result });
    } catch (error) {
        res.status(401).json({ result: false, message: error.message || "Fail to login" });
    }

});


router.post('/book-seat', async (req, res) => {
    try {

        console.log(">>")
        let result = await seatsControler.addSeat(req.body);

        res.status(200).json({ result: true, data: "Seat Booked" });
    } catch (error) {
        res.status(401).json({ result: false, message: error.message || "Fail to book seat" });
    }

});


router.post('/book-seat', async (req, res) => {
    try {

        console.log(">>")
        let result = await seatsControler.addSeat(req.body);

        res.status(200).json({ result: true, data: "Seat Booked" });
    } catch (error) {
        res.status(401).json({ result: false, message: error.message || "Fail to book seat" });
    }

});

router.put('/check-in-out', async (req, res) => {
    try {

        if (!([0, 1].includes(Number(req.body.is_checked_in)) && req.body.seat_id)) {
            throw new Error("seat_id and is_checked_in required")
        }
        let result = await seatsControler.updateSeat(req.body);
        res.status(200).json({ result: true, message: req.body.is_checked_in ? `Check-in` : `Check-out` });
    } catch (error) {
        res.status(401).json({ result: false, message: error.message || "Fail to book seat" });
    }

});
router.put('/update-seat-number', async (req, res) => {
    try {
 
        let result = await seatsControler.updateSeatNumber(req.body);
        res.status(200).json({ result: true, message: req.body.is_checked_in ? `Check-in` : `Check-out` });
    } catch (error) {
        res.status(401).json({ result: false, message: error.message || "Fail to book seat" });
    }

});

router.put('/update-seat-detail', async (req, res) => {
    try {
 
        let result = await seatsControler.updateSeat(req.body);
        res.status(200).json({ result: true, message: 'Detail Update successful' });
    } catch (error) {
        res.status(401).json({ result: false, message: error.message || "Fail to book seat" });
    }

});

module.exports = router;