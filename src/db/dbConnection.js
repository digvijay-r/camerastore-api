/*
 * File: dbConnection.js
 * Project: camerastore-api
 * File Created: Sunday, 27th September 2020
 * Author: Digvijay Rathore (rathore.digvijay10@gmail.com)
 * -----
 * Last Modified: Sun Sep 27 2020
 * Modified By: Digvijay Rathore
 */

const mongoose = require('mongoose');

const connectUrl = process.env.MONGODB_URL || 'mongodb://127.0.0.1:27017/camStoreDb';


mongoose.connect(connectUrl, {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
})