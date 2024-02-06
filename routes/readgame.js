var express = require('express');
var router = express.Router();
var Game = require('../models/game');

const mongoose = require('mongoose');
const uri = "mongodb+srv://admin:ZD71BXo4iJfRxzj1@sciac-0.koiol.mongodb.net/ufl-demo-database?retryWrites=true&w=majority";
// const uri = "mongodb://localhost:27017"
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

router.get('/', async function(req, res, next) {
  try {
    await mongoose.connect(uri, clientOptions);

    const games = await Game.find();

    res.render('gameselection', {
      games: games
    });
  } finally {
    mongoose.disconnect();
  }
});

router.post('/', async function(req, res, next) {
  console.log("Post not implemented yet for readgame");
});

module.exports = router;