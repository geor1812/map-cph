const mongoose = require("mongoose");

const locationSchema = new mongoose.Schema({
    latLong: {
        type: Array,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    address: {
        type: String
    },
    description: {
        type: String
    },
    comments: {
        type: Array
    }
});

module.exports = mongoose.model('Location', locationSchema);