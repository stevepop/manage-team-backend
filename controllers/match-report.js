const mongoose = require('mongoose')
const MatchReport = require('../models/match-report')
const Match = require('../models/match')

exports.getMatchReport = async (req, res, next) => {
  const matchReportId = new mongoose.Types.ObjectId(req.params.matchId)
  
  const match = await Match.findById(matchReportId)
  const matchReports = await MatchReport.find({ match: matchReportId })
    .populate('match')
    .populate('player')
  try {
    if (!matchReports) {
      const error = new Error('There was an error fetching match reports.');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ 
      message: 'Match Report fetched.', 
      match: match,
      matchReports: matchReports 
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

exports.getPlayerReport = async (req, res, next) => {
  const matchtId = new mongoose.Types.ObjectId(req.params.matchId)
  const playerId = new mongoose.Types.ObjectId(req.params.playerId)
  
  const matchReport = await MatchReport.findOne({ match: matchtId, player:  playerId})
    .populate('match')
    .populate('player')
  try {
    if (!matchReport) {
      res.status(201).json({})
    }
    res.status(200).json({ 
      message: 'Player Report fetched.',
      matchReport: matchReport
    });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

exports.createMatchReport = async (req, res, next) => {
  const match = req.body.match_id
  const player = req.body.player_id
  const target = req.body.target
  const actual = req.body.actual
  const comment = req.body.comment

  const matchReport = new MatchReport({
    match: match,
    player: player,
    target: target,
    actual: actual,
    comment: comment
  })

  let response = await matchReport.save()

  res.status(200).json({ message: 'Match report created', response: response });
}

exports.updateMatchReport = async (req, res, next) => {
  const match = req.body.match_id
  const player = req.body.player_id
  const target = req.body.target
  const actual = req.body.actual
  const comment = req.body.comment

  let response = await MatchReport.updateOne({
      match: match,
      player: player,
      target: target,
      actual: actual,
      comment: comment
    })

  res.status(200).json({ message: 'Match report created', response: response });
}


