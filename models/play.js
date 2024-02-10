const mongoose = require('mongoose');

const Play = new mongoose.Schema({
  gameId: String,
  type: String,
  period: Number,
  time: Number,
  playType: String,
  playNumber: Number,
  foulCode: String,
  category: String,
  acceptDecline: String,
  sideOfBall: String,
  team: String,
  player: String,
  callingOfficial: [String]
});

module.exports = mongoose.model('Play', Play);