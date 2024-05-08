const express = require('express')
const app = express()
const connectDb = require('../config/db')
const userRouter = require('../routes/userRoutes')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const PORT = 3500


app.use(cookieParser())
app.use(express.json());
app.use('/api/v1', userRouter)


connectDb();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`)
})

