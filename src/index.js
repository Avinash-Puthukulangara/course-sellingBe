import express from 'express';
import connectDb from '../config/db.js';
import userRouter from '../routes/userRoutes.js';
import instructorRouter from '../routes/instructorRoutes.js';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
dotenv.config();


const app = express();


app.use(cookieParser())
app.use(express.json());
app.use('/api/v1/user', userRouter)
app.use('/api/v1/instructor', instructorRouter)

const PORT = 3500
connectDb();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`)
})

