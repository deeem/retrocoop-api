const express = require('express')
const dotenv = require('dotenv')
const connectDB = require('./config/db')
const path = require('path')

dotenv.config({path: './config/.env'})

connectDB()

app = express()
app.use(express.static(path.join(__dirname, 'public')))
