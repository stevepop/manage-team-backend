const express = require('express');
const { body } = require('express-validator/check');
const router = express.Router();

const match_controller = require('../controllers/match')
const validation_rules = [
  body('date', 'Valid date required')
  .optional({ checkFalsy: true }).isISO8601(),
  body('time', 'Please enter time in format - mm:ss')
    .trim()
    .isLength({min: 5}),
  body('fixture', 'Please enter fixture - Team A vs Team B')
  .trim()
  .isLength({min: 4}),
  body('venue', 'Please enter venue')
  .trim()
  .isLength({min: 4}),
]

router.get('/', match_controller.getMatches)
router.post('/',  validation_rules, match_controller.createMatchfixture)
router.get('/:id', match_controller.getMatch)
router.put('/:id/selection', match_controller.updateTeamSelection)
router.put('/:id', validation_rules, match_controller.updateMatchFixture)

module.exports = router