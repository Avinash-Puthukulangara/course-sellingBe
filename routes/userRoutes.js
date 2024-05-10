const express = require('express')
const { signin, signup } = require('../controllers/userControllers')
const authenticateUser = require('../middlewares/user-mw.js')

const userRouter = express.Router()

userRouter.post('/signup',authenticateUser, signup)
userRouter.post('/signin', signin)


module.exports = userRouter