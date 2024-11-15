const secretKey = 'your_secret_key';
module.exports.auth = (req, res, next) => {

    try {
        const BearerToken = req.headers['authorization'];
        const token = BearerToken.split(' ')[1];
        console.log("token", token)
        if (!token) {
            return res.status(401).send('Access Denied: No Token Provided!');
        }
        const decoded = jwt.verify(token, secretKey);
        console.log(decoded);
        next()

    } catch (err) {
        if (err.name === 'TokenExpiredError') {
            console.error('Token has expired');
            return res.status(401).json({ result: false, message: "Token has expired" })
        } else {
            console.error('Invalid token');
            return res.status(401).json({ result: false, message: "Invalid token" })
        }
    }


}

module.exports.createToken = async (data) => {

    try {
        // Define the payload
        const payload = {
            result: data,
            exp: Math.floor(Date.now() / 1000) + (60 * 60) // Token expires in 1 hour
        };

        // Create the token
        const token = await jwt.sign(payload, secretKey);
        console.log("token", token)
        return token

    } catch (err) {
        console.error('Error to create Token', err.message || err);
    }


}