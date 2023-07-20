const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const contentSchema = new Schema({
    filename: {
        type: String,
        required: true
    },
    link:{
        type: String,
        required: true
    },
    timeStamp:{
        type: Date,
    }
})

module.exports = mongoose.model('Content', contentSchema);