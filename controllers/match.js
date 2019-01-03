const { validationResult } = require('express-validator/check')
const Match = require('../models/match')

exports.getMatches = async (req, res, next) => {
  try {
    const matches = await Match.find()
   
    res.status(200).json({
      message: 'match fixtures fetched successfully',
      matches: matches
    })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

exports.getMatch = async (req, res, next) => {
  const matchId = req.params.id
  const match = await Match.findById(matchId).populate('selection')
  
  try {
    if (!match) {
      const error = new Error('Could not find match.');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ message: 'Match fetched.', match: match });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

exports.createMatchfixture =  (req, res, next) => {
  const errors = validationResult(req)
  console.log(errors)

  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422
    error.data = errors.array()
    throw error
  }
  
  const date = req.body.date
  const time = req.body.time
  const venue = req.body.venue
  const fixture = req.body.fixture

  const training = new Match({
    date: date,
    time: time,
    venue: venue,
    fixture: fixture
  })

  training.save()
    .then(result => {
      res.status(201).json({ 
        message: 'Match fixture created', 
        result_id: result._id 
    })
    .catch (err => {
    if (!err.statusCode) {
      err.statusCode = 500
    }
    next(err)
    })
  })
}

exports.updateMatchFixture =  (req, res, next) => {
  const matchId = req.params.id
  Match.findById(matchId)
    .then(match => {
      if (!match) {
        const error = new Error('Could not find match fixture.');
        error.statusCode = 404;
        throw error;
      }

      match.date = req.body.date
      match.time = req.body.time
      match.venue = req.body.venue
      match.fixture = req.body.fixture
    
      match.save()
        .then(result => {
          res.status(201).json({ 
            message: 'Match fixture updated', 
            result_id: result._id 
        })
        .catch (err => {
        if (!err.statusCode) {
          err.statusCode = 500
        }
        next(err)
        })

    })
  })
}

exports.updateTeamSelection = async (req, res, next) => {
  const matchId = req.params.id
  const match = await Match.findById(matchId)

  match.selection = req.body.selectedPlayers
  await match.save()

  res.status(200).json({ message: 'Match selection updated' });
}