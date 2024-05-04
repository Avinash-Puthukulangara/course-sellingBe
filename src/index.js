const express = require('express')
const app = express()
const connectDb = require('../config/db')
const userRouter = require('../routes/index')
require('dotenv').config()
const PORT_NUM = process.env.PORT

app.use(express.json());
app.use('/api/v1', userRouter)


connectDb();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT_NUM, () => {
  console.log('server listening on port ' +PORT_NUM)
})

