'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupUserModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('user', {
    rut: {
      type: Sequelize.FLOAT,
      allowNull: false
    },
    email: {
      type: Sequelize.STRING,
      allowNull: false
    },
    isAdmin: {
      type: Sequelize.BOOLEAN,
      defaultValue: false,
      allowNull: true
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false
    }
  })
}
