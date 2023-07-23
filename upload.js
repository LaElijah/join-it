const mongoose = require('mongoose');
const Request = require("./join-it/utils/models/request");

async function uploadToMongo() {
    mongoose.connect('mongodb+srv://laelijah:6248@cluster0.8sudzog.mongodb.net/?retryWrites=true&w=majority', {useNewUrlParser: true, useUnifiedTopology: true});
    const db = mongoose.connection;


    db.on('error', console.error.bind(console, 'connection error:'));

    const document = new Request({
        name: 'John',
        date: new Date(),
        request: 'I want to buy a car'
    })

    await document.save();
}
uploadToMongo();