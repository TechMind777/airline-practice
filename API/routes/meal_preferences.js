const express = require('express');
const router = express.Router();

const mealPreferencesControler = require('../controler/meal_preferences');

router.get('/get-meal-preferences', async (req, res) => {
    try {
        
        let result = await mealPreferencesControler.getMealPreferences();

        res.status(200).json({ result: true, data: result });
    } catch (error) {
        res.status(401).json({ result: false, message: error.message || "Fail to login" });
    }

});

router.post('/add-meal-preferences', async (req, res) => {
    try {
        
        let result = await mealPreferencesControler.ad();

        res.status(200).json({ result: true, message: 'Record Added' });
    } catch (error) {
        res.status(401).json({ result: false, message: error.message || "Fail to login" });
    }

});
router.put('/update-meal-preferences', async (req, res) => {
    try {
        
        let result = await mealPreferencesControler.getMealPreferences();

        res.status(200).json({ result: true, message: 'Record Updated' });
    } catch (error) {
        res.status(401).json({ result: false, message: error.message || "Fail to login" });
    }

});
 
module.exports = router;