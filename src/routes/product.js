/*
 * File: product.js
 * Project: camerastore-api
 * File Created: Sunday, 27th September 2020
 * Author: Digvijay Rathore (rathore.digvijay10@gmail.com)
 * -----
 * Last Modified: Sun Sep 27 2020
 * Modified By: Digvijay Rathore
 */

const express = require('express');
const auth = require('../middlewares/auth');
const Product = require('../models/product.js');

const router = new express.Router();

router.get('/products', auth,  async (req, res) => {
    const optns = {};
    if(req.query.skip){
        optns.skip = parseInt(req.query.skip);
    }
    if (req.query.limit) {
        optns.limit = parseInt(req.query.limit);
    }
    try {
        const products = await Product.find({}, null, optns);
        res.send(products);
    } catch (e) {
        console.log(e);
        res.status(500).send()
    }
})

module.exports = router;