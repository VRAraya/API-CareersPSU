'use strict'
const debug = require('debug')('apicareers:api:db')

module.exports = {
  db: {
    database: process.env.DB_NAME || 'psucareers',
    username: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || 'Test123**',
    host: process.env.DB_HOST || 'localhost',
    dialect: 'mysql',
    logging: s => debug(s)
  },
  auth: {
    secret: process.env.SECRET || 'test',
    algorithms: ['RS256']
  }
}
