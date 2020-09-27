/*
 * File: auth.js
 * Project: camerastore-api
 * File Created: Sunday, 27th September 2020
 * Author: Digvijay Rathore (rathore.digvijay10@gmail.com)
 * -----
 * Last Modified: Sun Sep 27 2020
 * Modified By: Digvijay Rathore
 */

const jwt = require('jsonwebtoken');
const User = require('../models/user');


const auth = async (req, res, next) => {
    console.log('Auth middleware');
    try {
        const token = req.header('Authorization').replace('Bearer ', '');
        const secretKey = process.env.JWT_SECRET_KEY || "MySecretkeyForJWT";
        const decoded = jwt.verify(token, secretKey);
        const userData = await User.findOne({ _id: decoded._id });
        if (!userData) {
            throw new Error();
        }
        req.token = token;
        req.user = userData;
        next();
    } catch (error) {
        res.status(401).send({ errorMsg: 'Authentication failed.' });
    }
}

module.exports = auth;