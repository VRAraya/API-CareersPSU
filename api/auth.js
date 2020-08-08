'use strict'

const debug = require('debug')('apicareers:api:auth')
const express = require('express')
const passport = require('passport')
const boom = require('@hapi/boom')
const jwt = require('jsonwebtoken')

const auth = express.Router()

const serverConfig = require('psucareers-config')

const config = serverConfig({
  logging: s => debug(s)
})

//Basic Strategy
require('./utils/auth/strategies/basic')

auth.post('/token', async function (req, res, next) {
  passport.authenticate("basic", function (error, user) {
    try {
      if (error || !user) {
        debug('estoy acá')
        next(boom.unauthorized("No autorizado"))
      }

      req.login(user, { session: false }, async function (error) {
        if (error) {
          next(error)
        }

        const payload = { sub: user.rut, email: user.email }
        const token = jwt.sign(payload, config.auth.defaultAdminJwtSecret, {
          expiresIn: "15m"
        })

        return res.status(200).json({ access_token: token })
      })
    } catch (error) {
      next(error)
    }
  })(req, res, next)
})

module.exports = auth