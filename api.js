const debug = require('debug')('apicareers:api:routes')
const express = require('express')
const bodyParser = require('body-parser')
const auth = require('express-jwt')
const optimalcareer = require('./utils/functions/optimalcareers')
const guard = require('express-jwt-permissions')()
const boom = require('@hapi/boom')

const db = require('./utils/database/index.js')
const serverConfig = require('./utils/config/config.js')

const config = serverConfig({
  logging: s => debug(s)
})

const api = express.Router()

let services, Career, User

api.use('*', async (req, res, next) => {
  if (!services) {
    debug('Connecting to database')
    try {
      services = await db(config.db)
    } catch (error) {
      return next(error)
    }
    Career = services.Career
    User = services.User
  }
  next()
})

api.get('/careers', auth({ secret: config.auth.defaultJwtSecret, algorithms: ['HS256'] }), guard.check(['careers:read']), async (req, res, next) => {
  debug('A request has come to /careers')

  try {
    const careers = await Career.findAll()

    res.status(200).send(careers)
  } catch (error) {
    return next(error)
  }

})

api.get('/career/codeid/:codeid', auth({ secret: config.auth.defaultJwtSecret, algorithms: ['HS256'] }), guard.check(['careers:read']), async (req, res, next) => {
  const { codeid } = req.params

  debug(`request to /career/${codeid}`)

  let career
  try {
    career = await Career.findByCodeId(codeid)
  } catch (error) {
    return next(error)
  }

  if (!career || career.length == 0) {
    return next(new Error(`Career not found with codeid ${codeid}`))
  }

  res.status(200).send(career)
})

api.get('/career/name/:name', auth({ secret: config.auth.defaultJwtSecret, algorithms: ['HS256'] }), guard.check(['careers:read']), async (req, res, next) => {
  const { name } = req.params

  debug(`request to /career/${name}`)

  let career
  try {
    career = await Career.findByName(name)
  } catch (error) {
    return next(error)
  }

  if (!career || career.length == 0) { return next(new Error(`Career not found with name ${name}`)) }

  res.status(200).send(career)
})

api.get('/users', auth({ secret: config.auth.defaultJwtSecret, algorithms: ['HS256'] }), guard.check(['users:read']), async (req, res, next) => {
  debug('A request has come to /users')

  try {
    const users = await User.findAll()

    res.status(200).send(users)
  } catch (error) {
    return next(error)
  }
})

api.post('/apply', auth({ secret: config.auth.defaultJwtSecret, algorithms: ['HS256'] }), guard.check(['careers:read']), bodyParser.json(), async (req, res, next) => {
  debug('A user wants to apply')

  try {
    const nem = req.body.nem
    const ranking = req.body.ranking
    const maths = req.body.maths
    const language = req.body.language
    const science = req.body.science
    const history = req.body.history
    if (isNaN(nem) || isNaN(ranking) || isNaN(maths) || isNaN(language) || isNaN(science) || isNaN(history)) {
      return next(boom.badRequest())
    }
    const careers = await Career.findAll()
    const topTenCareers = optimalcareer(careers, nem, ranking, maths, language, science, history)

    res.status(200).send(topTenCareers)
  } catch (error) {
    return next(error)
  }

})

module.exports = api
