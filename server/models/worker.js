const mongoose = require('mongoose')

const Schema = mongoose.Schema

const workerSchema = new Schema({
    name: {type: String, required: true},
    phonenumber: {type: String, required: true},
    type: {type: Number, required: true}
})

module.exports = mongoose.model("Worker", workerSchema);