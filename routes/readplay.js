var express = require('express');
var router = express.Router();
var Game = require('../models/game');
var Play = require('../models/play');

router.get('/', async function(req, res, next) {
  const games = await Game.find();

  res.render('gameselection', {
    games: games,
    displayGame: false,
    displayFouls: false
  });
});

router.get('/:id', async function(req, res) {
  const games = await Game.find();

  const query = Game.where({
    id: req.params._id
  });
  const game = await query.findOne();

  var readableSchedDate = game.schedDate.toDateString() + " " + game.schedDate.toLocaleTimeString();
  var readableStartDate = game.startDate.toDateString() + " " + game.startDate.toLocaleTimeString();

  var plays = [];
  for (const playId of game.playIds) {
    const query = Play.where({
      _id: playId
    });

    const play = await query.findOne();

    plays = plays.concat(play);
  }

  res.render('gameselection', {
    games: games,
    game: game,
    plays: plays,
    readableSchedDate: readableSchedDate,
    readableStartDate: readableStartDate,
    displayGame: true,
    displayFouls: true
  });
});

module.exports = router;