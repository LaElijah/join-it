const mongoose = require("mongoose");

const { Schema } = mongoose

const requestSchema = new Schema({
    username: String,
    date: Date,
    resource: String,
    details: String,
    progress: {
        type: Number,
        default: 0
    },
    goal: {
        type: Number,
        default: 0
    },
    age: {
        type: String,
        default: "0 days ago"
    },
    category: String,



})

const Request = mongoose.models.Request || mongoose.model('Request', requestSchema)
module.exports = Request
