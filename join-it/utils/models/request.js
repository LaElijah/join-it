const mongoose = require("mongoose");

const { Schema } = mongoose

const requestSchema = new Schema({
    name: String,
    date: Date,
    request: String,

})

const Request = mongoose.models.Request || mongoose.model('Request', requestSchema)
module.exports = Request