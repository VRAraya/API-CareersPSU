'use strict'

const debug = require('debug')('apicareers:api:basic')
const passport = require('passport')
const { BasicStrategy } = require('passport-http')
const boom = require('@hapi/boom')
const bcrypt = require('bcrypt')

const db = require('psucareers-database')
const serverConfig = require('psucareers-config')

const config = serverConfig({
  logging: s => debug(s)
})

let services, User

passport.use(new BasicStrategy(
  async function (rut, password, cb) {
    // Connecting to the database
    if (!services) {
      debug('Connecting to database')
      try {
        services = await db(config.db)
      } catch (error) {
        return next(error)
      }
      User = services.User
    }
    // Search the rut in the database
    try {
      debug('Searching into the database')
      rut = Number(rut)
      const [user] = await User.findByRut(rut)
      if (!user) {
        return cb(boom.unauthorized(), false)
      }

      if (!(await bcrypt.compare(password, user.password))) {
        return cb(boom.unauthorized(), false)
      }

      return cb(null, user)
    } catch (error) {
      debug('Fatal Error')
      return cb(error)
    }
  })
)