var express = require('express');
var router = express.Router();
var Game = require('../models/game');



router.get('/', async function(req, res, next) {
  const games = await Game.find();

  res.render('gameselection', {
    games: games,
    displayGame: false
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

  res.render('gameselection', {
    games: games,
    game: game,
    readableSchedDate: readableSchedDate,
    readableStartDate: readableStartDate,
    displayGame: true,
    displayFouls: false
  });
});

module.exports = router;