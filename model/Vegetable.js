const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const vegetableSchema = new Schema({
    name:{
        type:String,
        required: true
    }
})
module.exports = mongoose.model('Vegetable', vegetableSchema)