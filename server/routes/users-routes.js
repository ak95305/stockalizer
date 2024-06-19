const express = require('express')
const usersController = require('../controllers/users-controller')
const authToken = require('../middlewares/auth')

const router = express.Router()

router.post('/signup', usersController.signup)

router.post('/login', usersController.login)

router.get('/logout', authToken, usersController.logout)

router.get('/', authToken, usersController.getUsers)

module.exports = router;