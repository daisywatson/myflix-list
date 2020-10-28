const mongoose = require('mongoose');

const mediaSchema = new mongoose.Schema({
    name:  { type: String, required: true},
    movie: {type: Boolean,},
    link:  { type: String},
    img:  { type: String},
    date: { type: Date},
    released: { type: Boolean},
    genre: {type: String},
    notes: {type: String},
    watched: {type: Boolean},
    userID: {type: String}
});

const Media = mongoose.model('Media', mediaSchema);

module.exports = Media;
