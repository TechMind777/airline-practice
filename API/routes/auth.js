const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');

const userControler = require('../controler/user');
const { createToken } = require('../middleware/auth');

router.post('/login', async (req, res) => {
    try {

        let result = await userControler.login({ ...req.body, user_type: 'staff' });

        // Create the token
        const token = await createToken(result);

        res.status(200).json({ result: true, message: "Login Success", data: result, token });
    } catch (error) {
        res.status(401).json({ result: false, message: error.message || "Fail to login" });
    }

});


router.post('/login-admin', async (req, res) => {
    try {

        let result = await userControler.login({ ...req.body, user_type: 'admin' });


        // Define your secret key
        const secretKey = 'your_secret_key';

        // Define the payload
        const payload = {
            result: result,
            exp: Math.floor(Date.now() / 1000) + (60 * 60) // Token expires in 1 hour
        };

        // Create the token
        const token = jwt.sign(payload, secretKey);

        res.status(200).json({ result: true, message: "Login Success", data: result, token });

    } catch (error) {
        res.status(401).json({ result: false, message: error.message || "Fail to login" });
    }

});
router.post('/signin', (req, res) => { });

module.exports = router;