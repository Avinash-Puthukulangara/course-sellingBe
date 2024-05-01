const express = require('express')
const app = express()
const connectDb = require('./config/db')
const PORT = process.env.PORT



connectDb();

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`)
})

