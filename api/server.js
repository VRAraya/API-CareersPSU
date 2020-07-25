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

// Middlewares
app.use(cors())
app.use('/api', api)
app.use('/api/auth', auth)

// Express Error Handler
app.use((err, req, res, next) => {
  debug(`Error: ${err.message}`)

  if (err.message.match(/not found/)) {
    return res.status(404).send({ error: err.message })
  }

  res.status(500).send({ error: err.message })
})

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
