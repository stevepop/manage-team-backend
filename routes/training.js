const express = require('express');
const router = express.Router();

const training_controller = require('../controllers/training')

router.get('/', training_controller.getTrainings)
router.get('/:id', training_controller.getTraining)
router.post('/', training_controller.createTraining)
router.put('/:id', training_controller.updateTraining)
router.delete('/:id', training_controller.deleteTraining)
module.exports = router