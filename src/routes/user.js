/*
 * File: user.js
 * Project: camerastore-api
 * File Created: Sunday, 27th September 2020
 * Author: Digvijay Rathore (rathore.digvijay10@gmail.com)
 * -----
 * Last Modified: Sun Sep 27 2020
 * Modified By: Digvijay Rathore
 */

const express = require('express');
const User = require('../models/user');

const router = new express.Router();

// API Route: Create user
router.post('/users/signUp', async (req, res) => {
    const user = new User(req.body);

    try {
        await user.save();
        const token = await user.generateAuthToken();
        res.status(201).send({ user, token });
    } catch (e) {
        console.log(e);
        res.status(400).send(e)
    }
})


// API Route: Login of the user
router.post('/users/login', async (req, res) => {
    try {
        const userData = await User.verifyUserLogin(req.body.name, req.body.password);
        const token = await userData.generateAuthToken();
        res.send({ userData, token });
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
});



module.exports = router;