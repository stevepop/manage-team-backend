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

exports.createMatchfixture = async (req, res, next) => {
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

  let response = await training.save()

  res.status(200).json({ message: 'Match fixture created', response: response })
}

exports.updateMatchFixture = async (req, res, next) => {
  const matchId = req.params.id
  const match = await Match.findById(matchId)

  match.date = req.body.date
  match.time = req.body.time
  match.venue = req.body.venue
  match.fixture = req.body.fixture

  await match.save()

  res.status(200).json({ message: 'Match fixture updated' });
}

exports.updateTeamSelection = async (req, res, next) => {
  const matchId = req.params.id
  const match = await Match.findById(matchId)

  match.selection = req.body.selectedPlayers
  await match.save()

  res.status(200).json({ message: 'Match selection updated' });
}