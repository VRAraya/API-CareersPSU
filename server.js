'use strict'

const debug = require('debug')('apicareers:api')
const http = require('http')
const express = require('express')
const chalk = require('chalk')
const cors = require('cors')

const api = require('./api')
const auth = require('./auth')

const port = process.env.PORT || 3000
const app = express()
const server = http.createServer(app)

const { logErrors, wrapErrors, errorHandler } = require('./utils/middlewares/errorHandlers')
const notFoundHandler = require('./utils/middlewares/notFoundHandler')

// Middlewares
app.use(cors())
app.use('/api', api)
app.use('/api/auth', auth)

//Catch 404
app.use(notFoundHandler)

// Express Error Handler
app.use(logErrors)
app.use(wrapErrors)
app.use(errorHandler)

function handleFatalError(err) {
  console.error(`${chalk.red('[fatal error]')} ${err.message}`)
  console.error(err.stack)
  process.exit(1)
}

if (!module.parent) {
  process.on('uncaughtException', handleFatalError)
  process.on('unhandledRejection', handleFatalError)

  server.listen(port, () => {
    console.log(`${chalk.green('[apicareers-api]')} server listening on port ${port}`)
  })
}

module.exports = server
