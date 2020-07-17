'use strict'

const setupDatabase = require('./lib/db')
const setupCareer = require('./lib/career')
const setupCareerModel = require('./models/career')
const defaults = require('defaults')

module.exports = async function (config) {
  config = defaults(config, {
    dialect: 'sqlite',
    pool: {
      max: 10,
      min: 0,
      idle: 10000
    },
    query: {
      raw: true
    }
  })

  const sequelize = setupDatabase(config)
  const CareerModel = setupCareerModel(config)

  await sequelize.authenticate()

  if (config.setup) {
    await sequelize.sync({ force: true })
  }

  const Career = setupCareer(CareerModel)

  return {
    Career
  }
}
