const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Entries = new Schema({
    title: {
        type: String
    },
    author: {
        type: String
    },
    keywords: {
        type: String
    },
    date: {
        type: String
    }
},{
    collection: 'entries'
});

module.exports = mongoose.model('Entries', Entries);