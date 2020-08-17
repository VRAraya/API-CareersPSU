'use strict'

const debug = require('debug')('apicareers:api:auth')
const express = require('express')
const passport = require('passport')
const boom = require('@hapi/boom')
const jwt = require('jsonwebtoken')

const auth = express.Router()

const serverConfig = require('./utils/config/config.js')

const config = serverConfig({
  logging: s => debug(s)
})

//Basic Strategy
require('./utils/auth/strategies/basic')

auth.post('/token', async function (req, res, next) {
  passport.authenticate("basic", function (error, user) {
    try {
      if (error || !user) {
        return next(error)
      }

      req.login(user, { session: false }, async function (error) {
        if (error) {
          return next(error)
        }
        let permissions = []
        if (user.isAdmin) {
          permissions = [
            'careers:read',
            'users:read'
          ]
        } else {
          permissions = [
            'careers:read'
          ]
        }

        const payload = { sub: user.rut, email: user.email, permissions: permissions }
        const token = jwt.sign(payload, config.auth.defaultJwtSecret, {
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