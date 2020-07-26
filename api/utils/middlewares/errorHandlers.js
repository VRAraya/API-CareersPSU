'use strict'

const serverConfig = require('psucareers-config')

const config = serverConfig({
  logging: s => debug(s)
})

function logErrors(err, req, res, next) {
  console.log(err.stack)
  next(err)
}

function clientErrorHandler(err, req, res, next) {
  //Catch Error for AJAX requests
  if (req.xhr) {
    res.status(500).json({ err })
  } else {
    next(err)
  }
}

function errorHandler(err, req, res, next) {
  //Catch Error while streaming
  if (res.headersSent) {
    next(err)
  }
  //if no dev environment, delete the stack error
  /*if (!config.dev) {
    delete err.stack
  }*/

  res.status(err.status || 500)
  res.render("error", { error: err })
}

module.exports = {
  logErrors,
  clientErrorHandler,
  errorHandler
}