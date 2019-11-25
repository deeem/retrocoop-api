const ErrorResponse = require('../utils/errorResponse')

const errorHandler = (err, req, res, next) => {
  let error = { ...err }

  // Mogoose bad ObjecID
  if ('CastError' === err.name) {
    const message = `Resource not found with id of ${err.value}`
    error = new ErrorResponse(message, 404)
  }
  // Mongoose duplicate key
  if (11000 === err.code) {
    const message = `Duplicate field value entered`
    error = new ErrorResponse(message, 400)
  }
  // Mongoose validation error
  if ('ValidationError' === err.name) {
    const message = Object.values(err.errors).map(val => val.message)
    err = new ErrorResponse(message, 400)
  }

  console.log(err)

  res
    .status(err.statusCode || 500)
    .json({ success: false, error: error.message || 'Server error' })
}

module.exports = errorHandler
