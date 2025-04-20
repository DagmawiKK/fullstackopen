const logger = require('../utils/logger')

const requestLogger = (req, res, next) => {
  logger.info(`Method: ${req.method} Path: ${req.path} Body: ${JSON.stringify(req.body)}`)
  next()
}

const unknownEndPoint = (req, res, next) => {
  res.sendStatus(404).json({ error: 'Page not found' })
  next()
}

const errorHandler = (error, req, res, next) => {
  logger.error(error.message)

  if (error.name === 'CastError') {
    return res.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return res.status(400).json({ error: error.message })
  }
  if (error instanceof SyntaxError) {
    return res.status(400).send({ error: 'Invalid JSON' })
  }

  next(error)
}

module.exports = { requestLogger, unknownEndPoint, errorHandler }