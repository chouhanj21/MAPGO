const mongoose = require('mongoose');
const User = require('./userSchema')

const userVerif = new mongoose.Schema({
    owner:{
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    createdAt: {
        type:Date,
        default: Date.now()
    }
})

const UserVerif = mongoose.model('UserVerif', userVerif);

module.exports = UserVerif;