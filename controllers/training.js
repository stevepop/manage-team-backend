const Training = require('../models/training')

exports.getTrainings = async (req, res, next) => {
  try {
    const trainings = await Training.find()
   
    res.status(200).json({
      message: 'trainings fetched successfully',
      trainings: trainings
    })
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

exports.getTraining = async (req, res, next) => {
  const trainingId = req.params.id
  const training = await Training.findById(trainingId)
  
  try {
    if (!training) {
      const error = new Error('Could not find training.');
      error.statusCode = 404;
      throw error;
    }
    res.status(200).json({ message: 'Training fetched.', training: training });
  } catch (err) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }
}

exports.createTraining = async (req, res, next) => {
  const date = req.body.date
  const time = req.body.time
  const venue = req.body.venue

  const training = new Training({
    date: date,
    time: time,
    venue: venue
  })

  let response = await training.save()

  res.status(200).json({ message: 'Training created', response: response })
}

exports.updateTraining = async (req, res, next) => {
  const trainingId = req.params.id
  const training = await Training.findById(trainingId)

  training.date = req.body.date
  training.time = req.body.time
  training.venue = req.body.venue

  await training.save()

  res.status(200).json({ message: 'Training updated' });
}

exports.deleteTraining = async (req, res, next) => {
  const trainingId = req.params.id

  try {
    let training = await Training.findOneAndRemove({
      _id: trainingId
    })
    if (!training) {
      res.status(404).send(new MyError('Not found error', ['Training for id ' + req.params.id + 'not found']))
    } else {
      res.status(204).send('Training successfully deleted')
    }
  } catch(error) {
    if (!err.statusCode) {
      err.statusCode = 500;
    }
    next(err);
  }

  res.status(200).json({ message: 'Training Id ' + req.params.id + ' deleted'});
}
