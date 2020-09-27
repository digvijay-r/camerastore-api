/*
 * File: createSeedData.js
 * Project: camerastore-api
 * File Created: Sunday, 27th September 2020
 * Author: Digvijay Rathore (rathore.digvijay10@gmail.com)
 * -----
 * Last Modified: Sun Sep 27 2020
 * Modified By: Digvijay Rathore
 */

const Product = require('../models/product.js');
const products = require('./products.json');

/**
 * This method is used to sed the products collection with some default data.
 */
async function createDefaultProductData() {

    let count = await Product.countDocuments({});
    if(count < products.length){
        console.log("count ", count);
        await Product.insertMany(products);
    }

}

createDefaultProductData();