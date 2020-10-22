const mongoose = require('mongoose');

const showSchema = new mongoose.Schema({
    name:  { type: String, required: true},
    link:  { type: String},
    img:  { type: String},
    released: { type: Boolean},
    airing: { type: Boolean},
    day: {type: String},
    time: {type: String},
    genre: {type: String},
    notes: {type: String},
    season: {type: Number},
    network: {type: String},
    status: {type: String}
});

const Show = mongoose.model('Show', showSchema);

module.exports = Show;
