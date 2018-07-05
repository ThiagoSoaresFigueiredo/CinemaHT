'use restrict';

const moongoose = require('mongoose');
const Schema = moongoose.Schema;

const schema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },

    age: {
        type: String,
        required: true,
        trim: true
    },

    mail: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    active: {
        type: Boolean,
        required: true,
        default: true
    }
});

module.exports = moongoose.model('Client', schema);