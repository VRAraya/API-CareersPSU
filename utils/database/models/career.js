'use strict'

const Sequelize = require('sequelize')
const setupDatabase = require('../lib/db')

module.exports = function setupCareerModel (config) {
  const sequelize = setupDatabase(config)

  return sequelize.define('career', {
    codeid: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    nem: {
      type: Sequelize.FLOAT,
      allowNull: false
    },
    ranking: {
      type: Sequelize.FLOAT,
      allowNull: false
    },
    language: {
      type: Sequelize.FLOAT,
      allowNull: false
    },
    maths: {
      type: Sequelize.FLOAT,
      allowNull: false
    },
    science: {
      type: Sequelize.FLOAT,
      allowNull: false
    },
    history: {
      type: Sequelize.FLOAT,
      allowNull: false
    },
    minavgappscore: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    minweightedscore: {
      type: Sequelize.INTEGER,
      allowNull: true
    },
    vacancies: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    firstscorelastyear: {
      type: Sequelize.FLOAT,
      allowNull: false
    },
    lastscorelastyear: {
      type: Sequelize.FLOAT,
      allowNull: false
    }

  })
}
