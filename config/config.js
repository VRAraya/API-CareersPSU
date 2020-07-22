'use strict'

require('dotenv').config()

const config = ({ setup = false, logging = () => { } } = {}) => ({
  db: {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    dialect: 'mysql',
    logging,
    setup
  },
  auth: {
    secret: process.env.SECRET || 'test',
    algorithms: ['RS256']
  }
})

module.exports = config