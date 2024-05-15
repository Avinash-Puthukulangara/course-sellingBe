import express from 'express';
import { signin, signup } from '../controllers/userControllers.js';
import authenticateUser from '../middlewares/user-mw.js';

const userRouter = express.Router()

userRouter.post('/signup', authenticateUser, signup)
userRouter.post('/signin', signin)


export default userRouter