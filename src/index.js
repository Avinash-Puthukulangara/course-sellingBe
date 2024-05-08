const express = require('express')
const app = express()
const connectDb = require('../config/db')
const userRouter = require('../routes/userRoutes')
const instructorRouter = require('../routes/instructorRoutes')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const PORT = 3500


app.use(cookieParser())
app.use(express.json());
app.use('/api/v1/user', userRouter)
app.use('/api/v1/instructor', instructorRouter)


connectDb();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`)
})

