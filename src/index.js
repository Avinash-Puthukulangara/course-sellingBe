const express = require('express')
const app = express()
const connectDb = require('../config/db')
const userRouter = require('../routes/index')
const cookieParser = require('cookie-parser')
require('dotenv').config()
const PORT_URL = 2345


app.use(cookieParser())
app.use(express.json());
app.use('/api/v1', userRouter)


connectDb();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT_URL, () => {
  console.log(`Server running at ${PORT_URL}`)
})

