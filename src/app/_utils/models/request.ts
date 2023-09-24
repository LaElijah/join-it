
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
    category: String,
    description: String,
    metric: String,
    image: String,

    // comments: [{
    //     username: String,
    //     date: Date,
    //     comment: String
    // }],
    // likes: [{
    //     username: String,
    //     date: Date
    // }],
    // dislikes: [{
    //     username: String,
    //     date: Date
    // }]

})

const NewRequest = mongoose.models.Request || mongoose.model('Request', requestSchema)
module.exports = NewRequest
