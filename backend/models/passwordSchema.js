const mongoose = require('mongoose');

const passwordChange = new mongoose.Schema({
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
        default: Date.now(),
        expires:'2m'
    }
})

const PasswordChange = mongoose.model('PasswordChange', passwordChange);

module.exports = PasswordChange;