const express = require('express');
const router = express.Router();

const player_controller = require('../controllers/player')
const { profileImage } = require('../utils/upload')

router.get('/', player_controller.getPlayers)
router.post('/', profileImage.single('image'), player_controller.createPlayer)
router.get('/:id', player_controller.getPlayer)
router.put('/:id', profileImage.single('image'), player_controller.updatePlayer)

module.exports = router