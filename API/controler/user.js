const userModels = require('../models/users');
const express = require('express');
// const router = express.Router()

const bcrypt = require('bcrypt');

const login = async (obj) => {
    console.log("obj", obj)
    let userData = await userModels.getUser({ email: obj.email, user_type: obj.user_type });

    console.log("userData", userData, userData.length)
    if((  userData.length == 0)) {
        throw new Error('Invalid email or password')
    }
    const match = await bcrypt.compare(obj.password, userData[0].password);
    if (match) {
        return userData;
    } else {
        throw new Error("invalid Password")
    }
}

module.exports = { login }