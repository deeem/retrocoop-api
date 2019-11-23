const express = require('express')
const dotenv = require('dotenv')
const path = require('path')
const colors = require('colors')

const connectDB = require('./config/db')
const errorHandler = require('./middlewares/errorHandler')

const games = require('./routes/game')
const requests = require('./routes/request')
const users = require('./routes/user')
const platforms = require('./routes/platform')

dotenv.config({path: './config/.env'})

connectDB()

app = express()
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')))

app.use('/api/games', games)
app.use('/api/requests', requests)
app.use('/api/users', users)
app.use('/api/platforms', platforms)

app.use(errorHandler)

const PORT = process.env.PORT || 3003

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
