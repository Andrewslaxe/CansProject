require('express-async-errors')
const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

const config = require('./utils/config')
const usersRouter = require('./controllers/user')
const cansRouter = require('./controllers/cans')
const loginRouter = require('./controllers/login')
const middleware = require('./utils/middleware')
const logger = require('./utils/logger')
logger.info('Connecting to', config.MONGODB_URI)

const http = require('http').Server(express)
mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info('Connected to MongoDB')
  })
  .catch((error) => {
    logger.error('Error connection to MongoDB:', error.message)
  })

app.use(cors())
app.use(express.static('build'))
app.use(express.json())
app.use(middleware.requestLogger)
app.use(middleware.tokenExtractor)

app.use('/api/cans', cansRouter)
app.use('/api/users', usersRouter)
app.use('/api/login', loginRouter)

module.exports = app
