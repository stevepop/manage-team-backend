const express = require('express');
const router = express.Router();

const match_report_controller = require('../controllers/match-report')

router.get('/:matchId', match_report_controller.getMatchReport)
router.get('/:matchId/player/:playerId', match_report_controller.getPlayerReport)
router.post('/', match_report_controller.createMatchReport)
router.put('/', match_report_controller.updateMatchReport)

module.exports = router