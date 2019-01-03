const express = require('express');
const { body } = require('express-validator/check');
const router = express.Router();

const player_controller = require('../controllers/player')
const { profileImage } = require('../utils/upload')

const validation_rules = [
  body('first_name', 'First name should be letters')
    .trim()
    .isLength({min: 3}),
  body('last_name', 'Last name should be letters')
  .trim()
  .isLength({min: 3}),
  body('position', 'Position should be 2 letters')
  .trim()
  .isLength({min: 2, max: 2})
]

router.get('/', player_controller.getPlayers)

router.post(
  '/', 
  profileImage.single('image'), 
  validation_rules,
  player_controller.createPlayer
)

router.get('/:id', player_controller.getPlayer)
router.put(
  '/:id', 
  profileImage.single('image'),
  validation_rules,
  player_controller.updatePlayer)

module.exports = router