const mongoose = require('mongoose');
const user = require('../models/user');
const Schema = mongoose.Schema;

const favoriteSchema = new Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: user,
        required: true
    },
    campsites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Campsite',
        required: true
    }]
}, {
    timestamps: true
});

const Favorite = mongoose.model('Favorite', favoriteSchema);

module.exports = Favorite;