const debug = require('debug')('apicareers:api:routes')
const express = require('express')
const bodyParser = require('body-parser')
const auth = require('express-jwt')
const optimalcareer = require('./utils/functions/optimalcareers')
const guard = require('express-jwt-permissions')()

const db = require('psucareers-database')
const serverConfig = require('psucareers-config')

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

api.get('/careers', auth({ secret: config.auth.defaultAdminJwtSecret, algorithms: ['HS256'] }), async (req, res, next) => {
  debug('A request has come to /careers')

  let careers = []

  try {
    careers = await Career.findAll()
  } catch (error) {
    return next(error)
  }
  res.send(careers)
})

api.get('/career/codeid/:codeid', async (req, res, next) => {
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

api.get('/career/name/:name', async (req, res, next) => {
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

api.get('/users', async (req, res, next) => {
  debug('A request has come to /users')

  let users = []

  try {
    users = await User.findAll()
  } catch (error) {
    return next(error)
  }
  res.send(users)
})

api.post('/apply', bodyParser.json(), async (req, res, next) => {
  debug('A user wants to apply')

  try {
    const nem = req.body.nem
    const ranking = req.body.ranking
    const maths = req.body.maths
    const language = req.body.language
    const science = req.body.science
    const history = req.body.history

    const careers = await Career.findAll()

    const topTenCareers = optimalcareer(careers, nem, ranking, maths, language, science, history)

    res.send(topTenCareers)

  } catch (error) {
    return next(error)
  }

})

module.exports = api
