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
    setup,
    defaultAdminPassword: process.env.DEFAULT_ADMIN_PASSWORD,
    defaultPassword: process.env.DEFAULT_PASSWORD,
    publicApiKeyToken: process.env.PUBLIC_API_KEY_TOKEN,
    adminApiKeyToken: process.env.ADMIN_API_KEY_TOKEN
  },
  auth: {
    defaultAdminJwtSecret: process.env.DEFAULT_ADMIN_JWT_SECRET || 'test',
    algorithms: ['RS256']
  }
})

module.exports = config