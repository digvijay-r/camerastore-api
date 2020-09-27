/*
 * File: app.js
 * Project: camerastore-api
 * File Created: Sunday, 27th September 2020
 * Author: Digvijay Rathore (rathore.digvijay10@gmail.com)
 * -----
 * Last Modified: Sun Sep 27 2020
 * Modified By: Digvijay Rathore
 */

const express = require('express');
require('./src/db/dbConnection.js');
const userRouter = require('./src/routes/user.js');
require('./src/seedProductData/createSeedData.js')

const app = express();
const port = process.env.port || 3000;

app.use(express.json())
app.use(userRouter);

app.get('/', (req, res) => {
    res.send('Hello from server');
})

app.listen(port, () => console.log(`Server is running on port ${port}`));