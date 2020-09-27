/*
 * File: user.js
 * Project: camerastore-api
 * File Created: Sunday, 27th September 2020
 * Author: Digvijay Rathore (rathore.digvijay10@gmail.com)
 * -----
 * Last Modified: Sun Sep 27 2020
 * Modified By: Digvijay Rathore
 */

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');



/**
* Schema of the user.
*/
const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    cart: [{
        productId: {
            type: String
        },
        qty: {
            type: Number
        }
    }]
}, {
    timestamps: true
});


userSchema.methods.toJSON = function () {
    const user = this;
    const userObject = user.toObject();

    delete userObject.password;

    return userObject;
}

/**
 * This method generate the authToken for the player for every signIn.
 */
userSchema.methods.generateAuthToken = async function () {
    const self = this;
    const secretKey = process.env.JWT_SECRET_KEY || "MySecretkeyForJWT";
    const authToken = jwt.sign({ _id: self._id.toString() }, secretKey);
    return authToken;
}


/**
 * Hash user password before saving.
 */
userSchema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next();
})


userSchema.statics.verifyUserLogin = async (name, password) => {
    const user = await User.findOne({ name });
    if (!user) {
        throw new Error('No registered Id.');
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
        throw new Error('Wrong Credentials');
    }
    return user;
}

const User = mongoose.model('User', userSchema);

module.exports = User;