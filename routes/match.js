const express = require('express');
const router = express.Router();

const match_controller = require('../controllers/match')

router.get('/', match_controller.getMatches)
router.post('/', match_controller.createMatchfixture)
router.get('/:id', match_controller.getMatch)
router.put('/:id/selection', match_controller.updateTeamSelection)
router.put('/:id', match_controller.updateMatchFixture)

module.exports = router