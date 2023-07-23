const mongoose = require("mongoose");

const { Schema } = mongoose

const userSchema = new Schema({
    Username: String,
    Password: Date,
    UUID: {
        type: String,
        default: "uuid()"
    },

})

const User = mongoose.models.User || mongoose.model('User', userSchema)
module.exports = User