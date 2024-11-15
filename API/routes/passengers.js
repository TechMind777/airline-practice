const express = require('express');
const router = express.Router();

const passengersControler = require('../controler/passengers');

router.get('/get-passengers', async (req, res) => {
    try {
        
        let result = await passengersControler.getPassengers(req.query);

        res.status(200).json({ result: true, data: result });
    } catch (error) {
        res.status(401).json({ result: false, message: error.message || "Fail to login" });
    }

});


router.post('/add-passengers', async (req, res) => {
    try {
        
        let result = await passengersControler.addPassengers(req.body);

        res.status(200).json({ result: true, message: 'Record Update' });
    } catch (error) {
        res.status(401).json({ result: false, message: error.message || "Fail to update" });
    }

});


router.put('/update-passengers', async (req, res) => {
    try {
        
        let result = await passengersControler.updatePassengers(req.body);

        res.status(200).json({ result: true, message: 'Record Update' });
    } catch (error) {
        res.status(401).json({ result: false, message: error.message || "Fail to update" });
    }

});
 
module.exports = router;