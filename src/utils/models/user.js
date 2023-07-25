const mongoose = require("mongoose");
const crypto = require("crypto");

const { Schema } = mongoose

const userSchema = new Schema({
    username: String,
    password: String,
    UUID: {
        type: String,
        default: crypto.randomUUID(),
    },

})

const User = mongoose.models.User || mongoose.model('User', userSchema)
module.exports = User