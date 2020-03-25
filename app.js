const express = require('express')
const path = require('path')
const colors = require('colors')
const cors = require('cors')

const connectDB = require('./utils/connectDB')
const errorHandler = require('./middlewares/errorHandler')

const games = require('./routes/game')
const coops = require('./routes/coop')
const users = require('./routes/user')
const platforms = require('./routes/platform')

connectDB()

app = express()
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

app.use(cors())

app.use('/api/games', games)
app.use('/api/coops', coops)
app.use('/api/users', users)
app.use('/api/platforms', platforms)

app.use(errorHandler)

const PORT = process.env.PORT || 8080

const server = app.listen(
  PORT,
  console.log(`server running ${process.env.NODE_ENV}`.yellow.bold)
)

// Handle unhandled promise rejections
process.on('unhandledRejection', (error, promise) => {
  console.log(`Error: ${error.message}`.red)
  // Close server & exit
  server.close(() => {
    process.exit(1)
  })
})
