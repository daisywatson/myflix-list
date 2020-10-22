const mongoose = require('mongoose');

const movieSchema = new mongoose.Schema({
    name:  { type: String, required: true},
    link:  { type: String},
    img:  { type: String},
    date: { type: Date},
    released: { type: Boolean},
    genre: {type: String},
    notes: {type: String}
});

const Movie = mongoose.model('Movie', movieSchema);

module.exports = Movie;
