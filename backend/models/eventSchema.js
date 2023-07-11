const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    eventname:{
        type: String,
        required: true
    },
    startTime: {
        type: Date,
        required: true,
    },
    endTime: {
        type: Date,
        required: true,
    },
    latitude: {
        type: Number,
        required: true
    },
    longitude: {
        type: Number,
        required: true
    },
    host: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Host'
    },
    hostname:{
        type: String,
        required: true
    },
    description: {
        type: String
    }
})

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;