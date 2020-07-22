const debug = require('debug')('apicareers:api:routes')
const express = require('express')
const auth = require('express-jwt')
const guard = require('express-jwt-permissions')()

const db = require('psucareers-database')
const serverConfig = require('psucareers-config')

const config = serverConfig({
  logging: s => debug(s)
})

const api = express.Router()

let services, Career

api.use('*', async (req, res, next) => {
  if (!services) {
    debug('Connecting to database')
    try {
      services = await db(config.db)
    } catch (error) {
      return next(error)
    }
    Career = services.Career
  }
  next()
})

api.get('/careers', async (req, res, next) => {
  debug('A request has come to /careers')

  const { user } = req

  /*if (!user || !user.username) {
    return next(new Error('Not authorized'))
  } */

  let careers = []

  try {
    careers = await Career.findAll()
  } catch (error) {
    return next(error)
  }
  res.send(careers)
})

api.get('/career/codeid/:codeid', auth(config.auth), guard.check(['careers:read']), async (req, res, next) => {
  const { codeid } = req.params

  debug(`request to /career/${codeid}`)

  let career
  try {
    career = await Career.findByCodeId(codeid)
  } catch (error) {
    return next(error)
  }

  if (!career) {
    return next(new Error(`Career not found with codeid ${codeid}`))
  }

  res.send(career)
})

api.get('/career/name/:name', auth(config.auth), guard.check(['careers:read']), async (req, res, next) => {
  const { name } = req.params

  debug(`request to /career/${name}`)

  let career
  try {
    career = await Career.findByName(name)
  } catch (error) {
    return next(error)
  }

  if (!career) { return next(new Error(`Career not found with name ${name}`)) }

  res.send(career)
})

module.exports = api
