const mongoose = require('mongoose');

var gameSchema = new mongoose.Schema(
  { 
    name: String, 
    cross_platform: Boolean,
    rating: { type: Number, default: null },
    release_date: Date });

var Game = mongoose.model('Game', gameSchema);

module.exports = Game;
