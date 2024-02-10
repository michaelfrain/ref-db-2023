var express = require('express');
var router = express.Router();
var Game = require('../models/game');

router.get('/', function(req, res, next) {
  res.render('creategame', { title: 'Create Game' });
});

router.post('/', async function(req, res, next) {
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

  res.render('success', {
    title: 'Success'
  });
});

function convertStringToUTCDate(dateString, timeString) {
  let combinedString = dateString + " " + timeString
  return new Date(combinedString);
}

module.exports = router;
