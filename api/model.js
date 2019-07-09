const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Entries = new Schema({
    title: {
        type: String,
        max: 40,
        min: 3,
        required: true
    },
    author: {
        type: String,
        max: 20,
        min: 2,
        required: true
    },
    keywords: {
        type: String
    },
    date: {
        type: String
    },
    body: {
        type: String
    }
},{
    collection: 'entries'
});

module.exports = mongoose.model('Entries', Entries);