const express = require('express')
const mongoose = require('mongoose')

const blogListRouter = require('./controllers/blogList')
const userRouter = require('./controllers/user')
const config = require('./utils/config')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')

const app = express()

mongoose
  .connect(config.MONGODB_URI)
  .then(() => logger.info('Connected to DB'))
  .catch((error) => logger.error('error while connecting to DB:', error.message))

// app.use(express.static('./dist'))
app.use(express.json())
app.use(middleware.requestLogger)

app.use('/api/blogs', blogListRouter)
app.use('/api/users', userRouter)

app.use(middleware.unknownEndPoint)
app.use(middleware.errorHandler)

module.exports = app








