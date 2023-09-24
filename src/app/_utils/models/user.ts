const mongoose = require("mongoose");
const crypto = require("crypto");


const { Schema } = mongoose

const userSchema = new Schema({
    email: String,
    username: String,
    password: String,
    profile: String,
    identity: {
        race: Array,
        gender: Array,
        sexuality: Array,
        disability: Array,
        mentalHealth: Array,
        neurodivergent: Array,
        socioeconomic: Array,
        occupation: Array,
        political: Array,
        hobbies: Array,
    },
    
    UUID: {
        type: String,
        default: crypto.randomUUID(),
    },
    groups: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Group'
        }
    ],

})

const User = mongoose.models.User || mongoose.model('User', userSchema)
module.exports = User