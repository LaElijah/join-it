const mongoose = require("mongoose");

const { Schema } = mongoose

const requestSchema = new Schema({
    username: String,
    date: Date,
    resources: String,
    details: String,
    progress: String,
    goal: String,
    age: String,
    category: String,



})

const Request = mongoose.models.Request || mongoose.model('Request', requestSchema)
module.exports = Request
