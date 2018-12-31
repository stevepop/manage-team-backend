const Player = require('../models/player')

exports.getPlayers = async (req, res, next) => {
  try {
    const players = await Player.find()
   
    res.status(200).json({
      message: 'players fetched successfully',
      players: players
    })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

exports.getPlayer = async (req, res, next) => {
  const playerId = req.params.id
  const player = await Player.findById(playerId)
  
  try {
    if (!player) {
      const error = new Error('Could not find player.');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ message: 'Post fetched.', player: player });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

exports.createPlayer = async (req, res, next) => {
  const first_name = req.body.first_name
  const last_name = req.body.last_name
  const position = req.body.position
  const email = req.body.email
  
  const imageUrl = req.file ? req.file.location : null

  const player = new Player({
    first_name: first_name,
    last_name: last_name,
    position: position,
    ranking: 0,
    email: email,
    image: imageUrl
  })

  let response = await player.save()

  res.status(200).json({ message: 'Player created', response: response });
}

exports.updatePlayer = async (req, res, next) => {
    console.log(req.params.id)
    const playerId = req.params.id
    const player = await Player.findById(playerId)

    if (!player) {
      const error = new Error('Could not find player.');
      error.statusCode = 404;
      throw error;
    }

    console.log(req.body)
    player.first_name = req.body.first_name
    player.last_name = req.body.last_name
    player.position = req.body.position
    player.email = req.body.email
    player.image = req.file ? req.file.location : player.image
  try {
    const updated = await player.save()
    console.log(updated)

    res.status(200).json({ message: 'Post fetched.', response: updated });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

