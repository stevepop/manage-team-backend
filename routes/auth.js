const express = require('express')
const authController = require('../controllers/auth')

const router = express.Router()
router.post('/login', authController.postLogin)
router.post('/create', authController.createUser)
router.get('/me', authController.getUser)


module.exports = router