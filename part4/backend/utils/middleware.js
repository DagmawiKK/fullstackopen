const logger = require('../utils/logger')

// used when logging responses
const requestLogger = (req, res, next) => {
  logger.info(`Method: ${req.method} Path: ${req.path} Body: ${JSON.stringify(req.body)}`)
  next()
}

// handles unknown routes
const unknownEndPoint = (req, res, next) => {
  res.sendStatus(404).json({ error: 'Page not found' })
  next()
}

// error handling middlware
const errorHandler = (error, req, res, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  } else if (error instanceof SyntaxError) {
    return res.status(400).send({ error: 'Invalid JSON' })
  } else if (error.name === 'MongoServerError' && error.message.includes('E11000 duplicate key error')) {
    return res.status(400).json({ error: 'expected `username and email` to be unique' })
  }

  next(error)
}

module.exports = { requestLogger, unknownEndPoint, errorHandler }