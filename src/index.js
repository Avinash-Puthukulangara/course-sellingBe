const express = require('express')
const app = express()
const connectDb = require('../config/db')
const userRouter = require('../routes/index')
const PORT = process.env.PORT


app.use('/api/v1', userRouter)

connectDb();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})

