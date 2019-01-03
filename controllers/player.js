const { validationResult } = require('express-validator/check')
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

exports.createPlayer = (req, res, next) => {
  // Validation
  const errors = validationResult(req)
  if (!errors.isEmpty()) {
    const error = new Error('Validation failed, entered data is incorrect.');
    error.statusCode = 422
    error.data = errors.array()
    throw error
  }

  let imageUrl = null

  const first_name = req.body.first_name
  const last_name = req.body.last_name
  const position = req.body.position
  const email = req.body.email
  
  if (process.env.ENABLE_S3) {
    imageUrl = req.file ? req.file.location : null
  } else {
    imageUrl = req.file ? process.env.LOCAL_UPLOAD_URL + req.file.filename : null
  }
 
  const player = new Player({
    first_name: first_name,
    last_name: last_name,
    position: position.toUpperCase(),
    email: email,
    image: imageUrl
  })

  player.save()
    .then(result => {
      res.status(201).json({ 
        message: 'Player created', 
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

exports.updatePlayer =  (req, res, next) => {
    const playerId = req.params.id
    Player.findById(playerId)
      .then(player => {
        if (!player) {
          const error = new Error('Could not find player.');
          error.statusCode = 404;
          throw error;
        }

        let imageUrl = null

        player.first_name = req.body.first_name
        player.last_name = req.body.last_name
        player.position = req.body.position
        player.email = req.body.email

        if (process.env.ENABLE_S3) {
          imageUrl = req.file ? req.file.location : null
        } else {
          imageUrl = req.file ? process.env.LOCAL_UPLOAD_URL + req.file.filename : null
        }
        player.image = imageUrl      
    
        player.save()
        .then(result => {
          res.status(201).json({ 
            message: 'Player updated successfully', 
            result_id: result._id 
          })
      })
      .catch (err => {
        if (!err.statusCode) {
          err.statusCode = 500 
        }
        next(err)
       })
  })
}

