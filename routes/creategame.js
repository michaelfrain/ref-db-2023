var express = require('express');
var router = express.Router();
var Game = require('../models/game');

const mongoose = require('mongoose');
const uri = "mongodb+srv://admin:ZD71BXo4iJfRxzj1@sciac-0.koiol.mongodb.net/ufl-demo-database?retryWrites=true&w=majority";
// const uri = "mongodb://localhost:27017"
const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

router.get('/', function(req, res, next) {
  res.render('create', { title: 'Create Game' });
});

router.post('/', async function(req, res, next) {
  try {
    await mongoose.connect(uri, clientOptions);
  
    const newGame = new Game({
      schedDate: convertStringToUTCDate(req.body.gameTimeScheduledDate, req.body.gameTimeScheduledTime),
      startDate: convertStringToUTCDate(req.body.gameTimeScheduledDate, req.body.gameTimeStartTime),
      homeTeam: req.body.homeTeam,
      visitingTeam: req.body.visitingTeam,
      homeScore: req.body.homeScore,
      visitorScore: req.body.visitorScore,
      gameDuration: req.body.gameDuration,
      crew: [req.body.referee, req.body.umpire, req.body.headLine, req.body.lineJudge, req.body.fieldJudge, req.body.sideJudge, req.body.backJudge]
    });

    await newGame.save();
  } finally {
    mongoose.disconnect();
  }
});

function convertStringToUTCDate(dateString, timeString) {
  let combinedString = dateString + " " + timeString
  return Date(combinedString);
}

module.exports = router;
