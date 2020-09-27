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

// API Route: Get all Products
router.get('/products', auth, async (req, res) => {
    const optns = {};
    if (req.query.skip) {
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
});

// API Route: Add Product to cart
router.post('/products/addToCart', auth, async (req, res) => {
    console.log("user data ", req.user, req.body);
    try {
        const product = await Product.findById(req.body.productId);
        console.log(product);
        if (!product) {
            throw new Error('No product Found.');
        }

        let newItem = true;
        if (req.user.cart.length) {
            for (let i = 0; i < req.user.cart.length; i++) {
                if (req.user.cart[i].productId == product._id.toString()) {
                    req.user.cart[i].qty++;
                    newItem = false;
                    break;
                }
            }
        }
        console.log(newItem);

        if (newItem) {
            req.user.cart.push({
                productId: product._id,
                qty: 1
            })
        }

        await req.user.save();
        res.status(201).send('Product added to cart!')
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }

});

// API Route: Get Cart of User 
router.get('/products/userCart', auth, async (req, res) => {
    try {
        let cart = [], totalCartAmt = 0;
        for (let index = 0; index < req.user.cart.length; index++) {
            const element = req.user.cart[index];
            const productDetails = await Product.findById(element.productId);
            // console.log(productDetails);
            let product = productDetails.toObject();
            product.totalAmt = product.price * element.qty;
            product.qty = element.qty;
            totalCartAmt += product.totalAmt;
            cart.push(product);
        }
        // console.log("product array ", totalCartAmt, cart);
        res.send({ cart, totalCartAmt });
    } catch (error) {
        res.status(500).send();
    }
})

module.exports = router;