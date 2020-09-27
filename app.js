/*
 * File: app.js
 * Project: camerastore-api
 * File Created: Sunday, 27th September 2020
 * Author: Digvijay Rathore (rathore.digvijay10@gmail.com)
 * -----
 * Last Modified: Sun Sep 27 2020
 * Modified By: digvijay
 */

const express = require('express');

const app = express();
const port = process.env.port || 8080;

app.get('/', (req, res) => {
    res.send('Hello from server');
})

app.listen(port, () => console.log(`Server is running on port ${port}`));