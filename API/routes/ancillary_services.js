const express = require('express');
const router = express.Router();

const ancillaryServicesControler = require('../controler/ancillary_services');

router.get('/get-ancillary-services', async (req, res) => {
    try {
        
        let result = await ancillaryServicesControler.getAncillaryServices();

        res.status(200).json({ result: true, data: result });
    } catch (error) {
        res.status(401).json({ result: false, message: error.message || "Fail to login" });
    }

});
router.post('/add-ancillary-services', async (req, res) => {
    try {
        
        let result = await ancillaryServicesControler.addAncillaryServices(req.body);

        res.status(200).json({ result: true, message: "Record Added" });
    } catch (error) {
        res.status(401).json({ result: false, message: error.message || "Fail to add" });
    }

});
 

router.put('/update-ancillary-services', async (req, res) => {
    try {
        
        let result = await ancillaryServicesControler.updateAncillaryServices(req.body);

        res.status(200).json({ result: true, message: 'Record updated' });
    } catch (error) {
        res.status(401).json({ result: false, message: error.message || "Fail to login" });
    }

});
 
module.exports = router;