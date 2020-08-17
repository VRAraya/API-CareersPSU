'use strict'

const serverConfig = require('../config/config.js')
const boom = require('@hapi/boom')

const config = serverConfig({
  logging: s => debug(s)
})

function withErrorStack (error, stack) {
  if (config.db.dev) {
    return { ...error, stack }
  }

  return error
}

function logErrors (err, req, res, next) {
  console.log(err)
  next(err)
}

function wrapErrors (err, req, res, next) {
  if (!err.isBoom) {
    next(boom.badImplementation(err))
  }

  next(err)
}

function errorHandler (err, req, res, next) {
  const { output: { statusCode, payload } } = err

  res.status(statusCode)
  res.json(withErrorStack(payload, err.stack))
}

function errorTokenHandler (err, req, res, next) {
  if (err.message.match(/invalid token/)) {
    next(boom.unauthorized("Invalid Token"))
  }

  if (err.message.match(/jwt expired/)) {
    next(boom.boomify(err, { statusCode: 419 , message: "Session Expired" }))
  }

  if (err.message.match(/jwt malformed/)) {
    next(boom.boomify(err, { statusCode: 400 , message: "Invalid Token" }))
  }

  next(boom.boomify(err, { statusCode: 400 }))
}

module.exports = {
  logErrors,
  wrapErrors,
  errorHandler,
  errorTokenHandler
}
