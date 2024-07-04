const mongoose = require('mongoose')

const Schema = mongoose.Schema

const stockSchema = new Schema({
    lotNo: {type: String, required: true},
    desc: {type: String, required: true},
    qty: {type: Number, required: true},
    price: {type: Number},
    date: {type: Date, required: true}
})

module.exports = mongoose.model("Stock", stockSchema);