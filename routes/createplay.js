var express = require('express');
var router = express.Router();
var Play = require('../models/play');
var Game = require('../models/game');

const mongoose = require('mongoose');
const uri = "mongodb+srv://admin:ZD71BXo4iJfRxzj1@sciac-0.koiol.mongodb.net/ufl-demo-database?retryWrites=true&w=majority";
// const uri = "mongodb://localhost:27017"
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

router.get('/', async function(req, res, next) {
  const games = await Game.find();

  res.render('createplay', {
    title: "Create game",
    games: games,
    displayGame: false
  });
});

router.get('/:id', async function(req, res, next) {
  const games = await Game.find();

  const query = Game.where({
    id: req.params._id
  });
  const game = await query.findOne();

  var readableSchedDate = game.schedDate.toDateString() + " " + game.schedDate.toLocaleTimeString();
  var readableStartDate = game.startDate.toDateString() + " " + game.startDate.toLocaleTimeString();

  res.render('createplay', {
    games: games,
    game: game,
    readableSchedDate: readableSchedDate,
    readableStartDate: readableStartDate,
    displayFoulInput: true
  });
});

router.post('/:id', async function(req, res, next) {
  const games = await Game.find();

  const query = Game.where({
    id: req.params._id
  });
  const game = await query.findOne();

  const newPlay = new Play({
    gameId: game.id,
    type: req.body.typeSelection,
    period: req.body.period,
    time: req.body.minutes + req.body.seconds,
    playType: req.body.playTypeSelection,
    playNumber: req.body.playNumber,
    foulCode: req.body.foulcode,
    category: req.body.category,
    acceptDecline: req.body.ado,
    sideOfBall: req.body.sideOfBall,
    team: req.body.team,
    player: req.body.number,
    callingOfficial: [req.body.official]
  });

  var newPlayIds = game.playIds.concat(newPlay.id);

  await game.updateOne({ playIds: newPlayIds });
  await newPlay.save();

  res.render('success', {
    title: 'Success'
  });
})

module.exports = router;