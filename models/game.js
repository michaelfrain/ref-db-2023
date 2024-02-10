const mongoose = require('mongoose');
const Play = require('./play');

const Game = new mongoose.Schema({
  schedDate: Date,
  startDate: Date,
  homeTeam: String,
  visitingTeam: String,
  homeScore: Number,
  visitorScore: Number,
  gameDuration: Number,
  crew: [String],
  playIds: [String]
});

module.exports = mongoose.model('Game', Game);